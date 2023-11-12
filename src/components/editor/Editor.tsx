import parse from 'internet-object/dist/parser'
import { useMemo } from 'react'

import Editor from '@monaco-editor/react'

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

interface IoEditorProps {
  onChange?: (value: any, event: any) => void

  onMount?: (editor: any, monaco: any) => void

  language?: string

  theme?: string

  options?: Record<string, any>
}

function IoEditor (prop: IoEditorProps): JSX.Element {
  const options: any = useMemo(() => {
    return {
      ...editorOptions,
      ...(prop.options ?? {})
    }
  }, [prop.options])

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
    compile(value)
  }, 500)

  return (
    <Editor
      height="90vh"
      defaultLanguage="io"
      defaultValue="// Type in IO Code"
      value={dummyData.doc}
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

export default IoEditor
