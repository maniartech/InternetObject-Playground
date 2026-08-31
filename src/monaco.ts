import * as monacoEditor from 'monaco-editor';
import { loader } from '@monaco-editor/react';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import { palette, type Tokens } from './theme/muiTheme';
import { registerIoProviders } from './completion/providers';
// Monaco ships no type declarations for its internal service modules; the deep import is
// the same technique this file already uses for the editor workers above.
// @ts-ignore - no types published for this path
import { StandaloneServices } from 'monaco-editor/esm/vs/editor/standalone/browser/standaloneServices';
// @ts-ignore - no types published for this path
import { IStorageService } from 'monaco-editor/esm/vs/platform/storage/common/storage';

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
 * Opens the suggestion DETAILS pane by default.
 *
 * The io suggestions carry real documentation — what a constraint means and a worked
 * example of its syntax — but Monaco keeps that pane collapsed behind "Show More
 * (Ctrl+Space)", which is where the explanation nobody has read yet ends up hiding.
 *
 * There is no editor option for it: the suggest widget reads the preference straight
 * from the storage service (`expandSuggestionDocs`), and the standalone build backs that
 * with an in-memory store. Writing the value here — before any widget is created — is
 * both simpler and more reliable than driving the widget's own toggle, which only
 * expands when an item already has focus and would flip the pane shut if it ever ran
 * twice.
 *
 * A sentinel key makes this a DEFAULT rather than a policy: it is written once per page
 * load, so if the reader collapses the pane it stays collapsed.
 */
const DETAILS_DEFAULT_KEY = 'io.playground.suggestDetailsDefaulted';

function showSuggestionDetailsByDefault(): void {
  try {
    const storage: any = StandaloneServices.get(IStorageService);
    // 0 = StorageScope.PROFILE, 0 = StorageTarget.USER — the scope the widget reads.
    if (storage.getBoolean(DETAILS_DEFAULT_KEY, 0, false)) return;
    storage.store(DETAILS_DEFAULT_KEY, true, 0, 0);
    storage.store('expandSuggestionDocs', true, 0, 0);
  } catch {
    // Monaco's internals moved; suggestions still work, the pane just starts collapsed.
  }
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

  // Autocomplete, signature help and hover. Registered against the language, so this is
  // idempotent in the same way the tokenizer above is.
  registerIoProviders(monaco);
  showSuggestionDetailsByDefault();

  defineTheme(monaco, 'io-dark', 'vs-dark', palette.dark, 'dark');
  defineTheme(monaco, 'io-light', 'vs', palette.light, 'light');
}

export const monacoThemeFor = (mode: 'dark' | 'light') => (mode === 'dark' ? 'io-dark' : 'io-light');
