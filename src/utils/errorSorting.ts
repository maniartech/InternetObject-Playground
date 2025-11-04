/**
 * Error sorting and navigation utilities.
 * Extracted for testability and reuse.
 */

export interface ErrorPosition {
  line: number;
  col: number;
}

/**
 * Parse position from error message string.
 * Looks for the last occurrence of " at <line>:<col>".
 * Returns a sentinel position if not found.
 */
export function parseErrorPosition(message: string): ErrorPosition {
  const re = / at (\d+):(\d+)/g;
  let match: RegExpExecArray | null = null;
  let last: RegExpExecArray | null = null;

  while ((match = re.exec(message)) !== null) {
    last = match;
  }

  if (last) {
    const line = parseInt(last[1], 10);
    const col = parseInt(last[2], 10);
    if (!Number.isNaN(line) && !Number.isNaN(col)) {
      return { line, col };
    }
  }

  // Unknown position: use sentinel to sort to end
  return { line: Number.MAX_SAFE_INTEGER, col: Number.MAX_SAFE_INTEGER };
}

/**
 * Sort error messages by their position (line, then column).
 * Maintains stable order for messages at the same position or without positions.
 */
export function sortErrorMessages(messages: string[]): string[] {
  return [...messages].sort((a, b) => {
    const pa = parseErrorPosition(a);
    const pb = parseErrorPosition(b);

    if (pa.line !== pb.line) {
      return pa.line - pb.line;
    }
    return pa.col - pb.col;
  });
}

/**
 * Find the best matching marker for a given position.
 * Prefer markers that cover the position; fallback to nearest on same line, then nearest by line.
 */
export function findMarkerForPosition(
  markers: Array<{
    startLineNumber?: number;
    startColumn?: number;
    endLineNumber?: number;
    endColumn?: number;
  }>,
  position: ErrorPosition
): typeof markers[0] | null {
  if (!markers || markers.length === 0) return null;

  const { line, col } = position;

  // Prefer markers that cover the position
  const covering = markers.filter(m =>
    (m.startLineNumber != null && m.endLineNumber != null && m.startColumn != null && m.endColumn != null) &&
    (line >= m.startLineNumber && line <= m.endLineNumber) &&
    (line !== m.startLineNumber || col >= m.startColumn) &&
    (line !== m.endLineNumber || col <= m.endColumn)
  );

  if (covering.length > 0) return covering[0];

  // Fallback: same line, nearest column
  const sameLine = markers.filter(m => m.startLineNumber === line);
  if (sameLine.length > 0) {
    sameLine.sort((a, b) =>
      Math.abs((a.startColumn ?? 1) - col) - Math.abs((b.startColumn ?? 1) - col)
    );
    return sameLine[0];
  }

  // Fallback: nearest by line
  return markers.reduce((best, m) => {
    if (!best) return m;
    const d1 = Math.abs((m.startLineNumber ?? line) - line);
    const d2 = Math.abs((best.startLineNumber ?? line) - line);
    return d1 < d2 ? m : best;
  }, null as typeof markers[0] | null);
}
