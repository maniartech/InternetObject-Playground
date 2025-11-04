/**
 * Error types and interfaces for the IO Playground.
 * Provides structured error objects to replace string-based error messages.
 */

/**
 * Error category determines UI treatment (color, severity, icon).
 */
export type ErrorCategory = 'syntax' | 'validation' | 'runtime';

/**
 * Precise range in source text (1-indexed lines and columns).
 */
export interface ErrorRange {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

/**
 * Structured error item with all metadata.
 * Replaces string-based error messages for better type safety and features.
 */
export interface ErrorItem {
  /** Stable unique ID for de-duplication and focus management */
  id: string;

  /** Machine-readable error code (e.g., "invalid-range", "missing-bracket") */
  code?: string;

  /** Error category for UI styling and severity */
  category: ErrorCategory;

  /** User-facing error message */
  message: string;

  /** Source position range */
  range: ErrorRange;

  /** Which editor the error is from */
  source: 'doc' | 'defs';
}

/**
 * Editor marker for Monaco.
 * Subset of monaco.editor.IMarkerData with our extensions.
 */
export interface EditorMarker {
  /** Monaco severity: 8 = Error, 4 = Warning, 2 = Info, 1 = Hint */
  severity: 1 | 2 | 4 | 8;

  /** Error message displayed in hover */
  message: string;

  /** 1-indexed line number where error starts */
  startLineNumber: number;

  /** 1-indexed column where error starts */
  startColumn: number;

  /** 1-indexed line number where error ends */
  endLineNumber: number;

  /** 1-indexed column where error ends */
  endColumn: number;

  /** Optional: stable ID matching ErrorItem.id */
  id?: string;

  /** Optional: error category for filtering/grouping */
  category?: ErrorCategory;
}

/**
 * Monaco severity constants (match monaco.MarkerSeverity enum).
 */
export const MonacoSeverity = {
  Hint: 1,
  Info: 2,
  Warning: 4,
  Error: 8,
} as const;

/**
 * Map error category to Monaco severity.
 */
export function categoryToSeverity(category: ErrorCategory): number {
  switch (category) {
    case 'syntax':
      return MonacoSeverity.Error; // Red squiggles
    case 'validation':
      return MonacoSeverity.Warning; // Orange squiggles
    case 'runtime':
      return MonacoSeverity.Error; // Red squiggles
    default:
      return MonacoSeverity.Error;
  }
}

/**
 * JSON decoration metadata for highlighting error objects in output.
 * Emitted by the parser alongside the JSON output to avoid brace-scanning.
 */
export interface JsonDecoration {
  /** Error category for styling (syntax, validation, runtime) */
  category: ErrorCategory;

  /** Character offset in JSON string where error object starts */
  startOffset: number;

  /** Character offset in JSON string where error object ends (exclusive) */
  endOffset: number;

  /** Optional: matching ErrorItem.id for correlation */
  errorId?: string;
}

/**
 * Generate stable error ID from range and message.
 */
export function generateErrorId(range: ErrorRange, message: string): string {
  return `${range.startLine}:${range.startColumn}-${range.endLine}:${range.endColumn}:${message.substring(0, 20)}`;
}
