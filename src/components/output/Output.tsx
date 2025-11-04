import { useState, useEffect, useMemo }         from 'react'
import                                          './Output.css'
import Editor, { EditorProps }             from '../editor/Editor'
import Overlay                             from '../overlay/Overlay'
import { sortErrorMessages, parseErrorPosition } from '../../utils/errorSorting'
import { generateJsonErrorDecorations }         from '../../utils/jsonDecorations'
import type { ErrorItem }                      from '../../types/errors'

interface OutputProps extends EditorProps {
  error?: boolean
  errorMessages?: string[]  // Deprecated: use errorItems instead
  errorItems?: ErrorItem[]  // Structured errors with full metadata
  onNavigateToError?: (pos: { line: number; col: number }) => void
}

export default function Output({
  value,
  error,
  errorMessages,
  errorItems,
  options,
  onNavigateToError
}:OutputProps) {
  const [overlayDismissed, setOverlayDismissed] = useState(false);
  const [lastErrorContent, setLastErrorContent] = useState<string>('');

  // Reset dismissed state only when error content actually changes
  useEffect(() => {
    // Use errorItems if available, otherwise fall back to errorMessages
    const currentErrorContent = errorItems
      ? errorItems.map(e => e.id).join('|')
      : errorMessages?.join('|') || '';

    if (currentErrorContent !== lastErrorContent) {
      setLastErrorContent(currentErrorContent);
      // Only show overlay if there are new/different errors
      if (currentErrorContent) {
        setOverlayDismissed(false);
      }
    }
  }, [errorItems, errorMessages, lastErrorContent]);

  // Sort errors by their starting position using structured ErrorItem data
  const sortedErrors = useMemo(() => {
    if (errorItems && errorItems.length > 0) {
      // Use structured ErrorItem[] - sort by range directly
      return [...errorItems].sort((a, b) => {
        if (a.range.startLine !== b.range.startLine) {
          return a.range.startLine - b.range.startLine;
        }
        return a.range.startColumn - b.range.startColumn;
      });
    }

    // Fall back to legacy string-based sorting
    if (errorMessages && errorMessages.length > 0) {
      return sortErrorMessages(errorMessages);
    }

    return [];
  }, [errorItems, errorMessages]);

  // Build Monaco decorations that highlight error objects (those with "__error": true) in the JSON output
  // Uses extracted utility function with comprehensive test coverage
  const outputDecorations = useMemo(() => {
    return generateJsonErrorDecorations(value || '');
  }, [value]);

  return (
    <div className="output">
  <Editor value={value} language="json" options={options} decorations={outputDecorations} />
      {
      error && sortedErrors && sortedErrors.length > 0 && !overlayDismissed && <Overlay
        heading={`Compiled with ${sortedErrors.length} problem${sortedErrors.length > 1 ? 's' : ''}:`}
        onClose={() => setOverlayDismissed(true)}
      >
        <div className="errors-container">
          {sortedErrors.map((item, index) => {
            // Handle both ErrorItem and string types
            const isErrorItem = typeof item === 'object' && 'category' in item;

            if (isErrorItem) {
              // Use structured ErrorItem
              const errorItem = item as ErrorItem;
              const isValidation = errorItem.category === 'validation';
              const errorClass = isValidation ? 'error validation-error' : 'error';

              const onClick = onNavigateToError
                ? () => onNavigateToError!({ line: errorItem.range.startLine, col: errorItem.range.startColumn })
                : undefined;

              // Format message with category prefix for consistency
              const prefix = errorItem.category === 'syntax' ? 'SYNTAX_ERROR: '
                           : errorItem.category === 'validation' ? 'VALIDATION_ERROR: '
                           : 'ERROR: ';
              const displayMessage = `${prefix}${errorItem.message} at ${errorItem.range.startLine}:${errorItem.range.startColumn}`;

              return (
                <div key={errorItem.id} className={onClick ? `${errorClass} clickable` : errorClass} onClick={onClick} title={onClick ? 'Click to jump to source' : undefined}>
                  {index > 0 && <hr className="error-separator" />}
                  {displayMessage}
                </div>
              );
            } else {
              // Legacy string-based error
              const errMsg = item as string;
              const isValidation = errMsg.startsWith('VALIDATION_ERROR:');
              const errorClass = isValidation ? 'error validation-error' : 'error';

              // Parse position using tested utility
              const pos = parseErrorPosition(errMsg);
              const hasPosition = pos.line !== Number.MAX_SAFE_INTEGER;
              const onClick = onNavigateToError && hasPosition
                ? () => onNavigateToError!(pos)
                : undefined;

              return (
                <div key={index} className={onClick ? `${errorClass} clickable` : errorClass} onClick={onClick} title={onClick ? 'Click to jump to source' : undefined}>
                  {index > 0 && <hr className="error-separator" />}
                  {errMsg}
                </div>
              );
            }
          })}
        </div>
      </Overlay>
      }
    </div>
  )
}