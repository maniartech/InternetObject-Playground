import Editor       from '@monaco-editor/react';
import parse        from 'internet-object/dist/parser/index';

import dummyData    from '../../sample-data/dummy-data';
import setupMonaco  from './monaco';
import useDebounce  from '../../hooks/use-debounce';

// REF: https://chat.openai.com/c/828fa9d6-981d-404a-8ef8-46e8140111ba

function compile(text:string) {
  try {
    const parsedData = parse(text);
    console.log(parsedData.toObject());
  } catch (error) {
    console.log(error);
  }
}

function IoEditor() {
  const handleEditorDidMount = (editor: any, monaco: any) => {
    setupMonaco(monaco);

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
    ]);

    editor.focus();
    compile(dummyData.doc)
  };

  const handleOnChange = useDebounce((value: any, event: any) => {
    compile(value);
  }, 500);

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
      options= {{
        selectOnLineNumbers: true,
        minimap: {
          enabled: false
        },
        formatOnPaste: true,
        formatOnType: true,
        autoIndent: "full",
        matchBrackets: "always",
      }}

    />
  );
}

export default IoEditor;
