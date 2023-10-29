// import { useEffect        } from 'react';

import MonacoEditor         from "react-monaco-editor";

const Editor = () => {

  const language = "io" //Set the language for syntax highlighting

  // useEffect(() => {
  //   // Register the custom language "io"
  //   monaco.languages.register({ id: 'io' });

  //   // Define the tokenization rules for "io"
  //   monaco.languages.setMonarchTokensProvider('io', {
  //     defaultToken: 'invalid',
  //     keywords: ['myVariable', 'myFunction'],
  //     operators: ['=', '{', '}', '(', ')'],
  //     symbols: /[=(){}]/,
  //     tokenizer: {
  //       root: [
  //         { include: 'keywords' },
  //         { include: 'operators' },
  //         [/\d+/, 'number'],
  //         [/[a-zA-Z_]\w*/, 'variable'],
  //         { include: 'whitespace' },
  //       ],
  //       keywords: [
  //         [/\b(myVariable|myFunction)\b/, 'keyword'],
  //       ],
  //       operators: [
  //         [/[{}=()]/, 'operator'],
  //       ],
  //       whitespace: [
  //         [/\s+/, 'white'],
  //       ],
  //     },
  //   });

  //   // Set up the language configuration
  //   monaco.languages.setLanguageConfiguration('io', {
  //     comments: {
  //       lineComment: '//',
  //       blockComment: ['/*', '*/'],
  //     },
  //   });
  // }, []);


  const editorDidMount = (editor: any, monaco: any) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  const onChange = (newValue: any, e: any) => {
    console.log('onChange', newValue, e);
  }

  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false
    },
    formatOnPaste: true,
    formatOnType: true,
  }

  return (
    <MonacoEditor
      language={language}
      theme="vs-dark"
      value={'Hello World'}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  )
}

export default Editor;