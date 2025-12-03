import { useEffect, useMemo, useState, useCallback } from 'react'
import MonacoEditor from '@monaco-editor/react'

import useDebounce from '../../hooks/use-debounce'
import editorOptions from './editor-options'
import setupMonaco from './monaco'
import type { EditorMarker } from '../../types/errors'

/**
 * Monaco editor instance type.
 * Using 'any' here is intentional as Monaco's internal types are complex
 * and the @monaco-editor/react package doesn't export proper types.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MonacoInstance = any

// Define an interface for the Editor component's props
export interface EditorProps {
  value?: string
  markers?: EditorMarker[]

  // Optional Monaco decorations (background highlights, etc.)
  decorations?: Array<{
    startLineNumber: number
    startColumn: number
    endLineNumber: number
    endColumn: number
    className?: string
    hoverMessage?: string
    isWholeLine?: boolean
  }>

  // onChange is called when the editor's value changes
  onChange?: (value: string | undefined) => void

  onChangeCaretPosition?: (position: {
    row: number
    column: number
    position: number
  }) => void

  // language specifies the editor language mode
  language?: string

  // debounce delay in milliseconds for onChange
  debounce?: number

  // Optional Monaco editor options override
  options?: Record<string, unknown>

  // Optional selection to programmatically select/reveal a range
  selection?: {
    startLineNumber: number
    startColumn: number
    endLineNumber?: number
    endColumn?: number
  } | null
}

function Editor({
  value,
  markers,
  decorations,
  onChange,
  onChangeCaretPosition,
  language = 'io',
  debounce = 0,
  options: optionsOverride,
  selection,
}: EditorProps): JSX.Element {
  const [editorInstance, setEditorInstance] = useState<MonacoInstance>(null)
  const [decorationIds, setDecorationIds] = useState<string[]>([])

  const options = useMemo(() => ({
    ...editorOptions,
    ...(optionsOverride ?? {})
  }), [optionsOverride])

  // Set markers on editor model
  useEffect(() => {
    const monaco = (window as MonacoInstance).monaco
    if (!monaco || !editorInstance) return

    monaco.editor.setModelMarkers(editorInstance.getModel(), 'owner', markers ?? [])
  }, [markers, editorInstance])

  // Apply Monaco decorations for background highlights
  useEffect(() => {
    const monaco = (window as MonacoInstance).monaco
    if (!monaco || !editorInstance) return

    const newDecorations = (decorations ?? []).map(d => ({
      range: new monaco.Range(d.startLineNumber, d.startColumn, d.endLineNumber, d.endColumn),
      options: {
        className: d.className || 'io-error-object-decoration',
        linesDecorationsClassName: d.className ? `${d.className}-gutter` : undefined,
        stickiness: 1, // Never grow when typing at edges
        hoverMessage: d.hoverMessage ? { value: d.hoverMessage } : undefined,
        isWholeLine: !!d.isWholeLine,
        zIndex: 5,
        overviewRuler: {
          color: 'rgba(255, 83, 83, 0.8)',
          position: 7, // OverviewRulerLane.Full
        },
        minimap: {
          color: 'rgba(255, 83, 83, 0.8)',
          position: 2, // MinimapPosition.Inline
        }
      }
    }))

    const newIds = editorInstance.deltaDecorations(decorationIds, newDecorations)
    setDecorationIds(newIds)

    return () => {
      // Clean up decorations when unmounting or dependencies change
      try {
        editorInstance.deltaDecorations(newIds, [])
      } catch {
        // Ignore cleanup errors (editor may be disposed)
      }
    }
    // Note: decorationIds intentionally excluded to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decorations, editorInstance])

  // Apply programmatic selection/reveal when selection prop changes
  useEffect(() => {
    const monaco = (window as MonacoInstance).monaco
    if (!monaco || !editorInstance || !selection) return

    const { startLineNumber, startColumn, endLineNumber, endColumn } = selection
    const endLn = endLineNumber ?? startLineNumber
    const endCol = endColumn ?? (startColumn + 1)

    try {
      const range = new monaco.Range(startLineNumber, startColumn, endLn, endCol)
      editorInstance.setSelection(range)
      editorInstance.revealRangeInCenter(range)
      editorInstance.focus()
    } catch {
      // Ignore errors if editor is not ready
    }
  }, [selection, editorInstance])

  const handleEditorDidMount = useCallback((editor: MonacoInstance, monaco: MonacoInstance): void => {
    setupMonaco(monaco)
    setEditorInstance(editor)

    editor.onDidChangeCursorPosition((event: MonacoInstance) => {
      if (onChangeCaretPosition) {
        const position = editor.getModel().getOffsetAt(event.position)
        onChangeCaretPosition({
          row: event.position.lineNumber,
          column: event.position.column,
          position,
        })
      }
    })

    editor.focus()
  }, [onChangeCaretPosition])

  const handleOnChange = useDebounce((newValue: string | undefined) => {
    onChange?.(newValue)
  }, debounce)

  return (
    <MonacoEditor
      defaultLanguage={language}
      defaultValue=""
      value={value ?? ''}
      language={language}
      theme="io-dark"
      onMount={handleEditorDidMount}
      onChange={handleOnChange}
      options={options}
    />
  )
}

export default Editor
