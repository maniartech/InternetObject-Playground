
const setupMonaco = (monaco: any) => {
  const language = "io";

  monaco.languages.register({ id: 'io' });
  // console.log('monaco.languages', monaco.languages);

  monaco.languages.setMonarchTokensProvider(language, {
    tokenizer: {
      root: [
        // comments
        [/#[^\n]*/, 'comment'],

        // keywords
        [/\b(T|true|F|false|N|null|string|email|url|datetime|date|time|bool|boolean|int|byte|int16|int2|int64|number|object|array)\b/, 'keyword'],

        // attributes
        [/(\$*[a-zA-Z_]*[?\*]{0,2}\w*)(\s*:)/, ['attribute.name', 'delimiter']],

        // delimiters
        [/{|}|[|]|,/, 'delimiter'],

        // strings
        [/"([^"\\]|\\.)*"/, 'string'], // to match double-quoted strings
        [/'([^'\\]|\\.)*'/, 'string'], // to match single-quoted strings

        // tagged strings
        [/[a-z0-9]+'[^']*'/, 'tagged-string'], // to match 'tag'' strings
        [/[a-z0-9]+"[^"]*"/, 'tagged-string'], // to match "tag"" strings

        // numbers
        [/\b\d+(\.\d+)?\b/, 'number'], // to match numbers
      ]
    }
  });

  monaco.editor.defineTheme('io-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'attribute.name', foreground: '#7bdcfe' },
      { token: 'tagged-string', foreground: '#A34532' },
      // { token: 'comment', foreground: '#00FF00' },
      // { token: 'delimiter', foreground: '#C0C0C0' },
      // { token: 'keyword', foreground: '#FF0000' }
    ],
    colors: {
      'editor.foreground': '#C0C0C0',
      'editor.background': '#1E1E1E',
    }
  });

  monaco.editor.setTheme('io-dark');
};

export default setupMonaco;