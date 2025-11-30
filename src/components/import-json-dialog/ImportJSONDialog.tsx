import { useEffect, useRef, useState, useCallback } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { loadInferred, stringifyDocument } from 'internet-object';
import './ImportJSONDialog.css';

interface ImportJSONDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (schema: string, document: string) => void;
}

interface JsonError {
  message: string;
  line?: number;
  column?: number;
}

const SAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}`;

export default function ImportJSONDialog({
  isOpen,
  onClose,
  onImport,
}: ImportJSONDialogProps) {
  const [jsonText, setJsonText] = useState(SAMPLE_JSON);
  const [error, setError] = useState<JsonError | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      // Focus editor when opened
      setTimeout(() => {
        editorRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleEditorDidMount = useCallback((editor: any) => {
    editorRef.current = editor;
  }, []);

  // Parse JSON error message to extract line and column
  const parseJsonError = useCallback((errorMessage: string): JsonError => {
    // Try to extract position from error message
    // Format: "... at position X" or "... at line Y column Z"
    const positionMatch = errorMessage.match(/at position (\d+)/i);
    const lineColMatch = errorMessage.match(/line (\d+) column (\d+)/i);

    if (lineColMatch) {
      return {
        message: errorMessage,
        line: parseInt(lineColMatch[1], 10),
        column: parseInt(lineColMatch[2], 10),
      };
    }

    if (positionMatch) {
      const position = parseInt(positionMatch[1], 10);
      // Calculate line and column from position
      const textUpToError = jsonText.substring(0, position);
      const lines = textUpToError.split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;

      return {
        message: `${errorMessage} (line ${line} column ${column})`,
        line,
        column,
      };
    }

    return { message: errorMessage };
  }, [jsonText]);

  const handleErrorClick = useCallback(() => {
    if (error?.line && editorRef.current) {
      const editor = editorRef.current;
      const line = error.line;
      const column = error.column || 1;

      // Set cursor position and reveal the line
      editor.setPosition({ lineNumber: line, column });
      editor.revealLineInCenter(line);
      editor.focus();

      // Optionally select the line to highlight it
      editor.setSelection({
        startLineNumber: line,
        startColumn: 1,
        endLineNumber: line,
        endColumn: editor.getModel()?.getLineMaxColumn(line) || column,
      });
    }
  }, [error]);

  const handleImport = useCallback(() => {
    setError(null);

    // First, try to parse the JSON
    let jsonData: any;
    try {
      jsonData = JSON.parse(jsonText);
    } catch (e: any) {
      setError(parseJsonError(`Invalid JSON: ${e.message}`));
      return;
    }

    // Use loadInferred to infer schema and load data
    try {
      const doc = loadInferred(jsonData);

      // Stringify the document to get schema and data parts
      // Get schema/definitions part
      const schemaText = stringifyDocument(doc, { includeHeader: true });

      // Extract schema (header) and data parts
      // The stringifyDocument output format is:
      // ~ $schema: {...}
      // ~ $nestedSchema: {...}
      // ---
      // data, data, data

      const parts = schemaText.split('\n---\n');
      let schemaPart = '';
      let dataPart = '';

      if (parts.length >= 2) {
        schemaPart = parts[0];
        dataPart = parts.slice(1).join('\n---\n');
      } else if (parts.length === 1) {
        // Check if it's just data (starts with ~) or just schema
        const trimmed = parts[0].trim();
        if (trimmed.startsWith('~') && !trimmed.includes('$schema')) {
          // It's data only (collection items)
          dataPart = trimmed;
        } else if (trimmed.startsWith('~')) {
          // It's schema definitions
          schemaPart = trimmed;
        } else {
          // Single data item
          dataPart = trimmed;
        }
      }

      // Clean up the data part - remove leading ~ for single objects
      // but keep them for collection items
      let cleanDataPart = dataPart.trim();
      if (cleanDataPart.startsWith('~ ') && !cleanDataPart.includes('\n~')) {
        // Single item with ~ prefix, remove it
        cleanDataPart = cleanDataPart.substring(2);
      }

      onImport(schemaPart, cleanDataPart);
      onClose();
    } catch (e: any) {
      setError({ message: `Failed to infer schema: ${e.message}` });
    }
  }, [jsonText, onImport, onClose, parseJsonError]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="import-json-dialog-overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="import-json-dialog-content"
        onClick={e => e.stopPropagation()}
      >
        <button className="import-json-dialog-close" onClick={onClose}>×</button>

        <div className="import-json-dialog-header">
          <div className="import-icon-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <h2>Import JSON</h2>
        </div>

        <p className="import-json-promo">
          Paste or type your JSON data below. <br />
          <span className="highlight-text">Internet Object will automatically infer the schema and convert it to IO format.</span>
        </p>

        <div className="import-json-editor-container">
          <MonacoEditor
            height="100%"
            language="json"
            theme="vs-dark"
            value={jsonText}
            onChange={(value) => setJsonText(value || '')}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              fontSize: 14,
              tabSize: 2,
              wordWrap: 'on',
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>

        {error && (
          <div
            className={`import-json-error ${error.line ? 'clickable' : ''}`}
            onClick={error.line ? handleErrorClick : undefined}
            title={error.line ? 'Click to go to error location' : undefined}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error.message}</span>
            {error.line && (
              <svg className="goto-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            )}
          </div>
        )}

        <p className="import-json-hint">
          <strong>Tip:</strong> You can import JSON objects or arrays. The schema will be automatically inferred from your data structure.
        </p>

        <div className="import-json-button-group">
          <button className="import-json-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="import-json-import-btn"
            onClick={handleImport}
            disabled={!jsonText.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Import JSON
          </button>
        </div>
      </div>
    </div>
  );
}
