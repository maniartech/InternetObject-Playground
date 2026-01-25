import type { editor } from 'monaco-editor'

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  selectOnLineNumbers: true,
  minimap: {
    enabled: false
  },
  formatOnPaste: true,
  formatOnType: true,
  autoIndent: 'full',
  matchBrackets: 'always',
  fixedOverflowWidgets: true,
  scrollbar: {
    vertical: 'visible',
    horizontal: 'visible'
  },
}

export default editorOptions
