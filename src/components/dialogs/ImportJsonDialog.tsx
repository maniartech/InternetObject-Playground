import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import { FocusSafeDialog } from './FocusSafeDialog';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import { Editor } from '@monaco-editor/react';
import { loadInferred, stringifyDocument, stringifyHeader } from 'internet-object';
import { setupMonaco } from '../../monaco';
import { MONO, useTokens } from '../../theme/muiTheme';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImport: (schema: string, document: string) => void;
  monacoTheme: string;
}

interface JsonError {
  message: string;
  line?: number;
  column?: number;
  isIOError?: boolean;
  jsonInput?: string;
}

const SAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}`;

export function ImportJsonDialog({ isOpen, onClose, onImport, monacoTheme }: Props) {
  const t = useTokens();
  const [jsonText, setJsonText] = useState(SAMPLE_JSON);
  const [error, setError] = useState<JsonError | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setTimeout(() => editorRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const parseJsonError = useCallback((errorMessage: string): JsonError => {
    const positionMatch = errorMessage.match(/at position (\d+)/i);
    const lineColMatch = errorMessage.match(/line (\d+) column (\d+)/i);
    if (lineColMatch) {
      return { message: errorMessage, line: parseInt(lineColMatch[1], 10), column: parseInt(lineColMatch[2], 10) };
    }
    if (positionMatch) {
      const position = parseInt(positionMatch[1], 10);
      const textUpToError = jsonText.substring(0, position);
      const lines = textUpToError.split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;
      return { message: `${errorMessage} (line ${line} column ${column})`, line, column };
    }
    return { message: errorMessage };
  }, [jsonText]);

  const handleErrorClick = useCallback(() => {
    if (error?.line && editorRef.current) {
      const editor = editorRef.current;
      const line = error.line;
      const column = error.column || 1;
      editor.setPosition({ lineNumber: line, column });
      editor.revealLineInCenter(line);
      editor.focus();
      editor.setSelection({ startLineNumber: line, startColumn: 1, endLineNumber: line, endColumn: editor.getModel()?.getLineMaxColumn(line) || column });
    }
  }, [error]);

  const handleImport = useCallback(() => {
    setError(null);
    let jsonData: any;
    try {
      jsonData = JSON.parse(jsonText);
    } catch (e: any) {
      setError(parseJsonError(`Invalid JSON: ${e.message}`));
      return;
    }

    const isCollection = Array.isArray(jsonData);
    try {
      const doc = loadInferred(jsonData);
      // The library owns the header/data separation: `stringifyHeader` gives just the
      // definitions, `includeHeader: false` gives just the data (section markers like
      // `--- accounting: $accounting` stay with the data, where they belong). No text
      // splitting — the old `split('\n---\n')` + `$schema` heuristics broke for
      // multi-section documents, which have no bare `---` and no default `$schema`.
      const dataOptions = isCollection ? { includeHeader: false } : { includeHeader: false, indent: 2 };
      const schemaPart = stringifyHeader(doc).trim();
      const dataPart = stringifyDocument(doc, dataOptions as any).trim();

      let cleanDataPart = dataPart.trim();
      if (cleanDataPart.startsWith('~ ') && !cleanDataPart.includes('\n~')) cleanDataPart = cleanDataPart.substring(2);

      onImport(schemaPart, cleanDataPart);
      onClose();
    } catch (e: any) {
      // Serialization refuses a document holding a failed record (`forbidden-error-node`). That is
      // not an inference failure and saying so sends the reader looking in the wrong place: the
      // schema was inferred, and then some row did not satisfy it.
      const message = e?.errorCode === 'forbidden-error-node'
        ? `Some rows do not fit the inferred schema, so this cannot be written as Internet Object text: ${e.message}`
        : `Failed to infer schema: ${e.message}`;
      setError({ message, isIOError: true, jsonInput: jsonText });
    }
  }, [jsonText, onImport, onClose, parseJsonError]);

  const handleReportIssue = useCallback(() => {
    if (!error?.isIOError) return;
    const jsonInput = error.jsonInput || '';
    const isLargeJson = jsonInput.length > 500;
    if (isLargeJson) {
      const blob = new Blob([jsonInput], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `io-import-error-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    const issueTitle = encodeURIComponent(`[Import JSON] Schema inference error`);
    const jsonSection = isLargeJson
      ? `**JSON Input:** _Large file (${jsonInput.length} characters) - Please attach the downloaded \`io-import-error-*.json\` file to this issue._`
      : `## JSON Input\n\`\`\`json\n${jsonInput}\n\`\`\``;
    const issueBody = encodeURIComponent(
      `## Description\nError occurred while importing JSON and inferring schema in the IO Playground.\n\n## Error Message\n\`\`\`\n${error.message}\n\`\`\`\n\n${jsonSection}\n\n## Environment\n- Source: IO Playground Import JSON\n- Date: ${new Date().toISOString()}\n- User Agent: ${navigator.userAgent}\n\n## Additional Context\n<!-- Please add any additional context about the problem here -->\n${isLargeJson ? '\n⚠️ **Note:** A JSON file was downloaded to your computer. Please drag and drop it into this issue to attach it.' : ''}\n`,
    );
    window.open(`https://github.com/maniartech/InternetObject-js/issues/new?title=${issueTitle}&body=${issueBody}&labels=bug,import-json`, '_blank');
  }, [error]);

  return (
    <FocusSafeDialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: t.surface, backgroundImage: 'none', border: `1px solid ${t.border}`, borderRadius: '12px' } }}>
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', maxHeight: '85vh' }}>
        <IconButton size="small" onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, color: t.inkFaint }} aria-label="Close"><CloseRoundedIcon fontSize="small" /></IconButton>

        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '10px', display: 'grid', placeItems: 'center', bgcolor: t.accentSoft, color: t.accent }}>
            <SyncAltRoundedIcon />
          </Box>
          <Typography variant="h6" sx={{ color: t.ink, fontWeight: 700 }}>JSON to IO</Typography>
          <Chip label="Experimental" size="small" sx={{ height: 20, fontSize: 10.5, bgcolor: t.surface3, color: t.inkDim }} />
        </Stack>

        <Typography sx={{ fontSize: 13, color: t.inkDim, mb: 1.5 }}>
          Convert JSON to IO's native format by inferring schemas and separating data from structure for a more compact representation.
        </Typography>

        <Box sx={{ height: 260, border: `1px solid ${t.border}`, borderRadius: '8px', overflow: 'hidden', mb: 1.5 }}>
          <Editor
            height="100%"
            language="json"
            theme={monacoTheme}
            value={jsonText}
            onChange={(v) => setJsonText(v || '')}
            beforeMount={(monaco) => setupMonaco(monaco)}
            onMount={(editor) => { editorRef.current = editor; }}
            options={{ minimap: { enabled: false }, lineNumbers: 'on', scrollBeyondLastLine: false, automaticLayout: true, fontSize: 13, fontFamily: MONO, tabSize: 2, wordWrap: 'on', formatOnPaste: true, formatOnType: true }}
          />
        </Box>

        {error && (
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              onClick={error.line ? handleErrorClick : undefined}
              title={error.line ? 'Click to go to error location' : undefined}
              sx={{ flex: 1, px: 1.25, py: 1, borderRadius: '8px', bgcolor: 'rgba(255,107,114,0.10)', border: `1px solid ${t.red}44`, color: t.red, fontSize: 12.5, cursor: error.line ? 'pointer' : 'default' }}
            >
              <ErrorOutlineRoundedIcon sx={{ fontSize: 16 }} />
              <span>{error.message}</span>
            </Stack>
            {error.isIOError && (
              <Button size="small" variant="outlined" startIcon={<BugReportRoundedIcon />} onClick={handleReportIssue} sx={{ color: t.inkDim, borderColor: t.border }}>
                Report
              </Button>
            )}
          </Stack>
        )}

        <Typography sx={{ fontSize: 12, color: t.inkFaint, mb: 2 }}>
          <b>Tip:</b> You can import JSON objects or arrays. The schema is inferred from your data structure.
        </Typography>

        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button variant="text" onClick={onClose} sx={{ color: t.inkDim }}>Cancel</Button>
          <Button variant="contained" onClick={handleImport} disabled={!jsonText.trim()} startIcon={<SyncAltRoundedIcon />}>Convert</Button>
        </Stack>
      </Box>
    </FocusSafeDialog>
  );
}
