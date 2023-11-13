import parse          from 'internet-object/dist/parser/index'
import { useMemo }    from 'react'
import MonacoEditor   from '@monaco-editor/react'

import useDebounce    from '../../hooks/use-debounce'
import dummyData      from '../../sample-data/dummy-data'
import editorOptions  from './editor-options'
import setupMonaco    from './monaco'

// REF: https://chat.openai.com/c/828fa9d6-981d-404a-8ef8-46e8140111ba

function compile (text: string): void {
  try {
    const parsedData = parse(text)
    console.log(parsedData.toObject())
  } catch (error) {
    console.log(error)
  }
}

// Define an interface for the Editor component's props
export interface EditorProps {

  value?: string

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
  const options: any = useMemo(() => {
    return {
      ...editorOptions,
      ...(props.options ?? {})
    }
  }, [props.options])

  const handleEditorDidMount = (editor: any, monaco: any): void => {
    setupMonaco(monaco)

    // Set the model markers
    monaco.editor.setModelMarkers(editor.getModel(), 'owner', [
      {
        startLineNumber: 3,
        startColumn: 10,
        endLineNumber: 3,
        endColumn: 10,
        message: 'Error message here',
        severity: monaco.MarkerSeverity.Error
      }
    ])

    editor.focus()
    compile(dummyData.doc)
  }

  const handleOnChange = useDebounce((value: any, event: any) => {
    // compile(value)
    if (props.onChange) {
      props.onChange(value, event)
    }
  }, 500)

  return (
    <MonacoEditor
      height="90vh"
      defaultLanguage="io"
      defaultValue="// Type in IO Code"
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
