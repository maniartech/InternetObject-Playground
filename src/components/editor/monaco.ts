
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
        [/\b(T|true|F|false|N|null|Inf|NaN|string|email|url|datetime|date|time|bool|boolean|int|float|number|bigint|decimal|int8|int16|int32|int64|uint8|uint16|uint32|uint64|flaot32|float64|object|array)\b/, 'keyword'],

        // attributes
        [/([@\$]*[a-zA-Z_]*[?\*]{0,2}\w*)(\s*:)/, ['attribute.name', 'delimiter']],

        // delimiters
        [/{|}|[|]|~|,/, 'delimiter'],

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
      { token: 'attribute.name', foreground: '#b5997f' }, //#7bdcfe #ce9178
      { token: 'tagged-string', foreground: '#b5997f' },
      // { token: 'comment', foreground: '#00FF00' },
      { token: 'delimiter', foreground: '#009999' },
      // { token: 'keyword', foreground: '#FF0000' }
      { token: 'string', foreground: '#b5997f' },
    ],
    colors: {
      'editor.foreground': '#C0C0C0',
      // 'editor.background': '#0f0f11',
    }
  });

  monaco.editor.setTheme('io-dark');
};

export default setupMonaco;