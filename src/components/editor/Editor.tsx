import { useEffect, useMemo, useState }    from 'react'
import MonacoEditor   from '@monaco-editor/react'
import useDebounce    from '../../hooks/use-debounce'
import editorOptions  from './editor-options'
import setupMonaco    from './monaco'

// Define an interface for the Editor component's props
export interface EditorProps {

  value?: string

  markers?: any

  // onChange is an optional function that will be called when the editor's
  // value changes
  onChange?: (value: any, event: any) => void

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

  }, [props.markers])

  const handleEditorDidMount = (editor: any, monaco: any): void => {
    setupMonaco(monaco)
    setEditorInstance(editor)
    editor.focus()
  }

  const handleOnChange = useDebounce((value, event) => {
    if (props.onChange) {
      props.onChange(value, event)
    }
  }, 500)

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="io"
      defaultValue=""
      value={props.value ?? ''}
      language="io"
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
