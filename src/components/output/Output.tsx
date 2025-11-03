import { useState, useEffect, useMemo }         from 'react'
import                                          './Output.css'
import Editor, { EditorProps }             from '../editor/Editor'
import Overlay                             from '../overlay/Overlay'

interface OutputProps extends EditorProps {
  error?: boolean
  errorMessages?: string[]
}

export default function Output({
  value,
  error,
  errorMessages,
  options
}:OutputProps) {
  const [overlayDismissed, setOverlayDismissed] = useState(false);
  const [lastErrorContent, setLastErrorContent] = useState<string>('');

  // Reset dismissed state only when error content actually changes
  useEffect(() => {
    const currentErrorContent = errorMessages?.join('|') || '';
    if (currentErrorContent !== lastErrorContent) {
      setLastErrorContent(currentErrorContent);
      // Only show overlay if there are new/different errors
      if (currentErrorContent) {
        setOverlayDismissed(false);
      }
    }
  }, [errorMessages, lastErrorContent]);

  // Build Monaco decorations that highlight error objects (those with "__error": true) in the JSON output
  const outputDecorations = useMemo(() => {
    if (!value) return [] as any[];

    const text: string = value;

    // Precompute line start indices for fast pos->(row,col) mapping
    const lineStarts: number[] = [0];
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\n') lineStarts.push(i + 1);
    }

    const posToLineCol = (pos: number) => {
      // Binary search line
      let low = 0, high = lineStarts.length - 1;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (lineStarts[mid] <= pos) {
          if (mid === lineStarts.length - 1 || lineStarts[mid + 1] > pos) {
            const row = mid + 1; // Monaco is 1-based
            const col = pos - lineStarts[mid] + 1;
            return { row, col };
          }
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return { row: 1, col: 1 };
    };

    // Build object ranges by scanning braces, ignoring those inside strings
    type Range = { start: number; end: number };
    const objectRanges: Range[] = [];
    const stack: number[] = [];
    let inString = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        // toggle inString if not escaped
        let backslashes = 0; let j = i - 1;
        while (j >= 0 && text[j] === '\\') { backslashes++; j--; }
        if ((backslashes % 2) === 0) inString = !inString;
      }
      if (inString) continue;
      if (ch === '{') stack.push(i);
      else if (ch === '}') {
        const start = stack.pop();
        if (start !== undefined) objectRanges.push({ start, end: i });
      }
    }

    // Sort by start asc (already mostly), and create a quick lookup for innermost containing range
    objectRanges.sort((a, b) => a.start - b.start);

    const decorations: any[] = [];
    const errorRegex = /"__error"\s*:\s*true/gi;
    let match: RegExpExecArray | null;
    while ((match = errorRegex.exec(text)) !== null) {
      const idx = match.index;
      // Find innermost range containing idx
      let chosen: Range | null = null;
      for (let k = 0; k < objectRanges.length; k++) {
        const r = objectRanges[k];
        if (r.start <= idx && idx <= r.end) {
          if (!chosen || r.start >= chosen.start) chosen = r;
        }
      }
      if (!chosen) continue;

      // Extract error category to determine styling
      // Look for "category": "syntax"|"validation"|"runtime" within the error object
      const objText = text.substring(chosen.start, chosen.end + 1);
      const categoryMatch = objText.match(/"category"\s*:\s*"(syntax|validation|runtime)"/);
      const category = categoryMatch ? categoryMatch[1] : 'syntax'; // default to syntax

      const startLC = posToLineCol(chosen.start);
      const endLC = posToLineCol(chosen.end + 1); // make end exclusive

      // Use different CSS classes based on error category
      const className = category === 'validation'
        ? 'io-error-object-decoration io-error-validation'
        : 'io-error-object-decoration io-error-syntax';

      const gutterClassName = category === 'validation'
        ? 'io-gutter-validation'
        : 'io-gutter-syntax';

      const overviewRulerColor = category === 'validation'
        ? 'rgba(255, 152, 0, 0.9)'
        : 'rgba(255, 83, 83, 0.8)';

      decorations.push({
        hoverMessage: `${category.charAt(0).toUpperCase() + category.slice(1)} error`,
        startLineNumber: startLC.row,
        startColumn: startLC.col,
        endLineNumber: endLC.row,
        endColumn: endLC.col,
        className,
        glyphMarginClassName: gutterClassName,
        overviewRuler: {
          color: overviewRulerColor,
          position: 7 // OverviewRulerLane.Full
        }
      });
    }

    return decorations;
  }, [value]);

  return (
    <div className="output">
  <Editor value={value} language="json" options={options} decorations={outputDecorations} />
      {
      error && errorMessages && errorMessages.length > 0 && !overlayDismissed && <Overlay
        heading={`Compiled with ${errorMessages.length} problem${errorMessages.length > 1 ? 's' : ''}:`}
        onClose={() => setOverlayDismissed(true)}
      >
        <div className="errors-container">
          {errorMessages.map((errMsg, index) => {
            // Determine error type from message prefix
            const isValidation = errMsg.startsWith('VALIDATION_ERROR:');
            const errorClass = isValidation ? 'error validation-error' : 'error';

            return (
              <div key={index} className={errorClass}>
                {index > 0 && <hr className="error-separator" />}
                {errMsg}
              </div>
            );
          })}
        </div>
      </Overlay>
      }
    </div>
  )
}