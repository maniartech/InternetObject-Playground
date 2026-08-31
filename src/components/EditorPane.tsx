import { useEffect, useRef, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { Editor, type BeforeMount, type OnMount } from '@monaco-editor/react';
import { setupMonaco } from '../monaco';
import { MONO, useTokens } from '../theme/muiTheme';
import type { EditorMarker } from '../types/errors';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CaretInfo {
  row: number;
  column: number;
  position: number;
}

export interface PaneDecoration {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  className?: string;
  hoverMessage?: string;
  isWholeLine?: boolean;
}

export interface EditorSelection {
  startLineNumber: number;
  startColumn: number;
  endLineNumber?: number;
  endColumn?: number;
}

interface Props {
  language: 'io' | 'json';
  monacoTheme: string;
  value?: string;
  readOnly?: boolean;
  wordWrap?: boolean;
  onChange?: (value: string | undefined) => void;
  onCaretChange?: (info: CaretInfo) => void;
  markers?: EditorMarker[];
  decorations?: PaneDecoration[];
  selection?: EditorSelection | null;
  /** Optional header slot rendered above the editor (desktop panes). */
  header?: ReactNode;
  /** Drop the card border/radius (mobile embeds the editor inside a tab card). */
  bare?: boolean;
  /**
   * Stable model URI for this editor.
   *
   * Monaco registers language features per LANGUAGE, so the schema and document panes —
   * both `io` — are otherwise indistinguishable to a completion provider. Without an
   * explicit path `@monaco-editor/react` generates an anonymous URI per instance, and a
   * provider cannot tell which pane it was asked about. See `completion/providers.ts`.
   */
  path?: string;
}

const BASE_OPTIONS = {
  selectOnLineNumbers: true,
  minimap: { enabled: false },
  formatOnPaste: true,
  formatOnType: true,
  autoIndent: 'full',
  matchBrackets: 'always',
  fixedOverflowWidgets: true,
  automaticLayout: true,
  scrollBeyondLastLine: false,
  fontFamily: MONO,
  fontSize: 13.5,
  lineNumbers: 'on',
  tabSize: 2,
  padding: { top: 10, bottom: 10 },
  // The status bar carries the "toggle details" affordance, so the documentation the
  // io suggestions provide is discoverable rather than hidden behind a shortcut.
  suggest: { showStatusBar: true },
  scrollbar: { vertical: 'visible', horizontal: 'visible', verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
} as const;

export function EditorPane({
  language,
  monacoTheme,
  value,
  readOnly,
  wordWrap,
  onChange,
  onCaretChange,
  markers,
  decorations,
  selection,
  header,
  bare,
  path,
}: Props) {
  const t = useTokens();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationIdsRef = useRef<string[]>([]);

  // Define the io themes BEFORE the editor is created, so @monaco-editor/react's
  // `theme` prop resolves to a real theme instead of falling back to the default
  // light `vs` theme (which caused an intermittently white editor pane).
  const handleBeforeMount: BeforeMount = (monaco) => setupMonaco(monaco);

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    monaco.editor.setTheme(monacoTheme);

    // Apply any markers that arrived before mount.
    const model = editor.getModel();
    if (markers && model) monaco.editor.setModelMarkers(model, 'owner', markers);

    editor.onDidChangeCursorPosition((event: any) => {
      if (!onCaretChange) return;
      const m = editor.getModel();
      if (!m) return;
      const position = m.getOffsetAt(event.position);
      onCaretChange({ row: event.position.lineNumber, column: event.position.column, position });
    });
  };

  // Error markers (squiggles).
  useEffect(() => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (!monaco || !editor) return;
    const model = editor.getModel();
    if (model) monaco.editor.setModelMarkers(model, 'owner', markers ?? []);
  }, [markers]);

  // Background decorations (JSON error objects).
  useEffect(() => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (!monaco || !editor) return;

    const next = (decorations ?? []).map((d) => ({
      range: new monaco.Range(d.startLineNumber, d.startColumn, d.endLineNumber, d.endColumn),
      options: {
        className: d.className || 'io-error-object-decoration',
        linesDecorationsClassName: d.className ? `${d.className}-gutter` : undefined,
        stickiness: 1,
        hoverMessage: d.hoverMessage ? { value: d.hoverMessage } : undefined,
        isWholeLine: !!d.isWholeLine,
        zIndex: 5,
        overviewRuler: { color: 'rgba(255, 83, 83, 0.8)', position: 7 },
        minimap: { color: 'rgba(255, 83, 83, 0.8)', position: 2 },
      },
    }));
    decorationIdsRef.current = editor.deltaDecorations(decorationIdsRef.current, next);
  }, [decorations]);

  // Programmatic selection / reveal (error navigation).
  useEffect(() => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (!monaco || !editor || !selection) return;
    const endLn = selection.endLineNumber ?? selection.startLineNumber;
    const endCol = selection.endColumn ?? selection.startColumn + 1;
    try {
      const range = new monaco.Range(selection.startLineNumber, selection.startColumn, endLn, endCol);
      editor.setSelection(range);
      editor.revealRangeInCenter(range);
      editor.focus();
    } catch {
      /* editor not ready */
    }
  }, [selection]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight: 0,
        height: '100%',
        bgcolor: t.surface,
        border: bare ? 'none' : `1px solid ${t.border}`,
        borderRadius: bare ? 0 : '8px',
        overflow: 'hidden',
      }}
    >
      {header}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Editor
          path={path}
          language={language}
          theme={monacoTheme}
          value={value ?? ''}
          beforeMount={handleBeforeMount}
          onMount={handleMount}
          onChange={onChange}
          options={{ ...BASE_OPTIONS, readOnly: !!readOnly, wordWrap: wordWrap ? 'on' : 'off' } as any}
        />
      </Box>
    </Box>
  );
}
