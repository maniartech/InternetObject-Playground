import Editor       from '@monaco-editor/react';
import dummyData    from './dummy-data';
import setupMonaco  from './monaco';

function IoEditor() {
  const handleEditorDidMount = (editor: any, monaco: any) => {
    setupMonaco(monaco);
    editor.focus();
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="io"
      defaultValue="// Type in IO Code"
      value={dummyData}
      language="io"
      theme="io-dark"
      onMount={handleEditorDidMount}
      options= {{
        selectOnLineNumbers: true,
        minimap: {
          enabled: false
        },
        formatOnPaste: true,
        formatOnType: true,
        autoIndent: "full"
      }}
    />
  );
}

export default IoEditor;
