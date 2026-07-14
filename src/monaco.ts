import * as monacoEditor from 'monaco-editor';
import { loader } from '@monaco-editor/react';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import { palette, type Tokens } from './theme/muiTheme';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Use the Monaco we bundle, not the one @monaco-editor/react fetches from jsDelivr by default.
// The CDN default pulls an arbitrary Monaco version at runtime (the editor is the whole app, so
// a blocked or unreachable CDN means a blank playground), and it silently drifts away from the
// version pinned in package.json — which is the one the io language and themes are built against.
(self as any).MonacoEnvironment = {
  getWorker(_workerId: string, label: string) {
    return label === 'json' ? new jsonWorker() : new editorWorker();
  },
};

loader.config({ monaco: monacoEditor });

let languageRegistered = false;

/** Monaco theme colours need #rrggbb / #rrggbbaa — build the translucent ones here. */
function editorColors(t: Tokens, mode: 'dark' | 'light') {
  const selection = mode === 'dark' ? '#3b9dff33' : '#0071d126';
  const lineHighlight = mode === 'dark' ? '#ffffff08' : '#0000000a';
  return {
    'editor.background': t.editorBg,
    'editor.foreground': t.ink,
    'editorLineNumber.foreground': t.inkFaint,
    'editorLineNumber.activeForeground': t.inkDim,
    'editorGutter.background': t.editorGutter,
    'editor.lineHighlightBackground': lineHighlight,
    'editor.lineHighlightBorder': '#00000000',
    'editor.selectionBackground': selection,
    'editor.inactiveSelectionBackground': selection,
    'editorCursor.foreground': t.accent,
    'editorWhitespace.foreground': t.borderSoft,
    'editorIndentGuide.background1': t.borderSoft,
    'editorIndentGuide.activeBackground1': t.border,
    'editorWidget.background': t.surface2,
    'editorWidget.border': t.border,
    'editorHoverWidget.background': t.surface2,
    'editorHoverWidget.border': t.border,
    'scrollbarSlider.background': `${t.border}aa`,
    'scrollbarSlider.hoverBackground': t.inkFaint,
    'scrollbarSlider.activeBackground': t.inkFaint,
  } as Record<string, string>;
}

function defineTheme(monaco: any, name: string, base: string, t: Tokens, mode: 'dark' | 'light') {
  monaco.editor.defineTheme(name, {
    base,
    inherit: true,
    rules: [
      { token: 'keyword', foreground: t.synKw.slice(1) },
      { token: 'attribute.name', foreground: t.synAttr.slice(1) },
      { token: 'tagged-string', foreground: t.synTag.slice(1) },
      { token: 'delimiter', foreground: t.synDelim.slice(1) },
      { token: 'string', foreground: t.synStr.slice(1) },
      { token: 'number', foreground: t.synNum.slice(1) },
      { token: 'comment', foreground: t.synCom.slice(1), fontStyle: 'italic' },
    ],
    colors: editorColors(t, mode),
  });
}

/**
 * Idempotent Monaco setup: registers the "io" language once and (re)defines the
 * io-dark / io-light themes. Safe to call on every editor mount.
 */
export function setupMonaco(monaco: any): void {
  if (!languageRegistered) {
    monaco.languages.register({ id: 'io' });
    monaco.languages.setMonarchTokensProvider('io', {
      tokenizer: {
        root: [
          // comments
          [/#[^\n]*/, 'comment'],
          // keywords / built-in types
          [
            /\b(T|true|F|false|N|null|Inf|NaN|string|email|url|datetime|date|time|bool|boolean|int|float|number|bigint|decimal|int8|int16|int32|int64|uint8|uint16|uint32|uint64|float32|float64|object|array)\b/,
            'keyword',
          ],
          // attribute (key) names
          [/([@$]*[a-zA-Z_]*[?*]{0,2}\w*)(\s*:)/, ['attribute.name', 'delimiter']],
          // delimiters
          [/{|}|\[|\]|~|,/, 'delimiter'],
          // strings
          [/"([^"\\]|\\.)*"/, 'string'],
          [/'([^'\\]|\\.)*'/, 'string'],
          // tagged strings
          [/[a-z0-9]+'[^']*'/, 'tagged-string'],
          [/[a-z0-9]+"[^"]*"/, 'tagged-string'],
          // numbers
          [/\b\d+(\.\d+)?\b/, 'number'],
        ],
      },
    });
    languageRegistered = true;
  }

  defineTheme(monaco, 'io-dark', 'vs-dark', palette.dark, 'dark');
  defineTheme(monaco, 'io-light', 'vs', palette.light, 'light');
}

export const monacoThemeFor = (mode: 'dark' | 'light') => (mode === 'dark' ? 'io-dark' : 'io-light');
