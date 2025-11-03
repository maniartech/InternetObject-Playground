import { useEffect, useMemo, useState }   from 'react'
import MonacoEditor                       from '@monaco-editor/react'

import useDebounce                        from '../../hooks/use-debounce'
import editorOptions                      from './editor-options'
import setupMonaco                        from './monaco'

// Define an interface for the Editor component's props
export interface EditorProps {

  value?: string

  markers?: any

  // Optional Monaco decorations (background highlights, etc.)
  decorations?: Array<{
    startLineNumber: number
    startColumn: number
    endLineNumber: number
    endColumn: number
    className?: string
    hoverMessage?: string
  }>

  // onChange is an optional function that will be called when the editor's
  // value changes
  onChange?: (value: any, event: any) => void

  onChangeCaretPosition?: (position: {
    row: number
    column: number
    position: number
  }) => void

  // onMount is an optional function that will be called when the
  // editor is mounted
  onMount?: (editor: any, monaco: any) => void

  // language is an optional string that specifies the language of the editor
  language?: string

  // theme is an optional string that specifies the theme of the editor
  theme?: string

  // options is an optional record that can contain any additional
  // options for the editor
  options?: Record<string, any>
}

function Editor (props: EditorProps): JSX.Element {
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [decorationIds, setDecorationIds] = useState<string[]>([]);

  const options: any = useMemo(() => {
    return {
      ...editorOptions,
      ...(props.options ?? {})
    }
  }, [props.options])


  useEffect(() => {
    const monaco = (window as any).monaco
    if (!monaco) {
      return
    }


    // Set the model markers
    if (editorInstance && props.markers) {
      monaco.editor.setModelMarkers(editorInstance.getModel(), 'owner', props.markers)
    }

  }, [props.markers, editorInstance])

  // Apply Monaco decorations for background highlights
  useEffect(() => {
    const monaco = (window as any).monaco
    if (!monaco || !editorInstance) return

    const decorations = (props.decorations ?? []).map(d => ({
      range: new monaco.Range(d.startLineNumber, d.startColumn, d.endLineNumber, d.endColumn),
      options: {
        className: d.className || 'io-error-object-decoration',
        stickiness: 1, // Never grow when typing at edges
        hoverMessage: d.hoverMessage ? { value: d.hoverMessage } : undefined,
      }
    }))

    const newIds = editorInstance.deltaDecorations(decorationIds, decorations)
    setDecorationIds(newIds)

    return () => {
      // Clean up decorations when unmounting or dependencies change
      try { editorInstance.deltaDecorations(newIds, []) } catch {}
    }
  }, [props.decorations, editorInstance])

  const handleEditorDidMount = (editor: any, monaco: any): void => {
    setupMonaco(monaco)
    setEditorInstance(editor)

    editor.onDidChangeCursorPosition((event: any) => {
      if (props.onChangeCaretPosition) {
        const position = editor.getModel().getOffsetAt(event.position)
        props.onChangeCaretPosition({
          row: event.position.lineNumber,
          column: event.position.column,
          position,
        })
      }
    })

    editor.focus()
  }

  const handleOnChange = useDebounce((value, event) => {
    if (props.onChange) {
      props.onChange(value, event)
    }
  }, 500)

  return (
    <MonacoEditor
      defaultLanguage={props.language || "io"}
      defaultValue=""
      value={props.value ?? ''}
      language={props.language || "io"}
      theme="io-dark"

      // Events
      onMount={handleEditorDidMount}
      onChange={handleOnChange}

      // Options
      options= {options}
    />
  )
}

export default Editor
