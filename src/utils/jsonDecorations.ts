/**
 * Utilities for generating Monaco decorations for error objects in JSON output.
 *
 * When parsing with skipErrors=true, the IO parser emits objects with __error: true
 * in the JSON output. This utility scans the stringified JSON to find and highlight
 * these error objects with appropriate styling based on their category.
 *
 * NOTE: This uses brace-scanning as a pragmatic solution. Ideally, the parser would
 * emit decoration metadata during serialization to avoid this. This is tracked as
 * technical debt for future parser enhancement.
 */

import type { ErrorCategory } from '../types/errors';

/**
 * Monaco decoration for highlighting JSON error objects.
 */
export interface JsonErrorDecoration {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  className: string;
  glyphMarginClassName: string;
  hoverMessage: string;
  overviewRuler: {
    color: string;
    position: number; // OverviewRulerLane.Full = 7
  };
}

/**
 * Position in text as line and column (1-indexed).
 */
interface Position {
  row: number;
  col: number;
}

/**
 * Character offset range in text.
 */
interface CharRange {
  start: number;
  end: number;
}

/**
 * Build line start index lookup for fast offset-to-position conversion.
 */
function buildLineStarts(text: string): number[] {
  const lineStarts: number[] = [0];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      lineStarts.push(i + 1);
    }
  }
  return lineStarts;
}

/**
 * Convert character offset to line:column position using binary search.
 */
function offsetToPosition(offset: number, lineStarts: number[]): Position {
  let low = 0;
  let high = lineStarts.length - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (lineStarts[mid] <= offset) {
      if (mid === lineStarts.length - 1 || lineStarts[mid + 1] > offset) {
        const row = mid + 1; // Monaco is 1-based
        const col = offset - lineStarts[mid] + 1;
        return { row, col };
      }
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return { row: 1, col: 1 };
}

/**
 * Scan JSON text to find all object ranges (braces), ignoring those inside strings.
 * Returns character offsets of matching { } pairs.
 */
function findObjectRanges(text: string): CharRange[] {
  const ranges: CharRange[] = [];
  const stack: number[] = [];
  let inString = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    // Toggle string state on unescaped quotes
    if (ch === '"') {
      let backslashes = 0;
      let j = i - 1;
      while (j >= 0 && text[j] === '\\') {
        backslashes++;
        j--;
      }
      if ((backslashes % 2) === 0) {
        inString = !inString;
      }
    }

    if (inString) continue;

    // Track brace pairs
    if (ch === '{') {
      stack.push(i);
    } else if (ch === '}') {
      const start = stack.pop();
      if (start !== undefined) {
        ranges.push({ start, end: i });
      }
    }
  }

  return ranges.sort((a, b) => a.start - b.start);
}

/**
 * Extract error category from error object text.
 * Looks for "category": "syntax"|"validation"|"runtime" property.
 */
function extractCategory(objectText: string): ErrorCategory {
  const categoryMatch = objectText.match(/"category"\s*:\s*"(syntax|validation|runtime)"/);
  return categoryMatch ? (categoryMatch[1] as ErrorCategory) : 'syntax';
}

/**
 * Find the innermost object range that contains the given offset.
 */
function findInnermostRange(offset: number, ranges: CharRange[]): CharRange | null {
  let chosen: CharRange | null = null;

  for (const range of ranges) {
    if (range.start <= offset && offset <= range.end) {
      // Prefer innermost (latest start)
      if (!chosen || range.start >= chosen.start) {
        chosen = range;
      }
    }
  }

  return chosen;
}

/**
 * Get CSS class names and colors for a given error category.
 */
function getCategoryStyles(category: ErrorCategory) {
  const isValidation = category === 'validation';

  return {
    className: isValidation
      ? 'io-error-object-decoration io-error-validation'
      : 'io-error-object-decoration io-error-syntax',
    glyphMarginClassName: isValidation
      ? 'io-gutter-validation'
      : 'io-gutter-syntax',
    overviewRulerColor: isValidation
      ? 'rgba(255, 152, 0, 0.9)'
      : 'rgba(255, 83, 83, 0.8)',
    hoverMessage: `${category.charAt(0).toUpperCase() + category.slice(1)} error`,
  };
}

/**
 * Generate Monaco decorations for error objects in JSON output.
 *
 * Scans the JSON text for objects with "__error": true, finds their brace ranges,
 * extracts their category, and returns Monaco decoration objects for highlighting.
 *
 * @param jsonText - Stringified JSON output from parser
 * @returns Array of Monaco decoration objects
 */
export function generateJsonErrorDecorations(jsonText: string): JsonErrorDecoration[] {
  if (!jsonText) return [];

  const lineStarts = buildLineStarts(jsonText);
  const objectRanges = findObjectRanges(jsonText);
  const decorations: JsonErrorDecoration[] = [];

  // Find all "__error": true markers
  const errorRegex = /"__error"\s*:\s*true/gi;
  let match: RegExpExecArray | null;

  while ((match = errorRegex.exec(jsonText)) !== null) {
    const errorOffset = match.index;

    // Find the object containing this error marker
    const objectRange = findInnermostRange(errorOffset, objectRanges);
    if (!objectRange) continue;

    // Extract category from object text
    const objectText = jsonText.substring(objectRange.start, objectRange.end + 1);
    const category = extractCategory(objectText);

    // Convert character offsets to line:column positions
    const startPos = offsetToPosition(objectRange.start, lineStarts);
    const endPos = offsetToPosition(objectRange.end + 1, lineStarts); // exclusive end

    // Get category-specific styling
    const styles = getCategoryStyles(category);

    decorations.push({
      startLineNumber: startPos.row,
      startColumn: startPos.col,
      endLineNumber: endPos.row,
      endColumn: endPos.col,
      className: styles.className,
      glyphMarginClassName: styles.glyphMarginClassName,
      hoverMessage: styles.hoverMessage,
      overviewRuler: {
        color: styles.overviewRulerColor,
        position: 7, // OverviewRulerLane.Full
      },
    });
  }

  return decorations;
}
