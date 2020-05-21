import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import "./Editor.css";

export default class Json extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "const x = 100;",
    };
  }

  componentDidUpdate() {}

  render() {
    const readOnly = this.props.readOnly === true;

    return (
      <div className="editor">
        <header>
          <label>{this.props.title}</label>
        </header>
        <div className="code">
          <MonacoEditor
            width="100%"
            height="100%"
            language={this.props.language || "text"}
            theme="vs-dark"
            value={this.props.code}
            options={{
              lineNumbers: true,
              glyphMargin: true,
              folding: false,
              readOnly: readOnly,
              automaticLayout: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 0,
              highlightActiveIndentGuide: true,
              renderLineHighlight: "none",
              overviewRulerBorder: false,
              scrollbar: {
                vertical: "auto",
                horizontal: "auto",
              },
              minimap: {
                enabled: false,
              },
            }}
            onChange={this.props.onChange}
            // editorDidMount={this.editorDidMount}
            // refresh={this.props.refresh}
          />
        </div>
      </div>
    );
  }
}
