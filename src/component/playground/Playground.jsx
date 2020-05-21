import React, { Component } from "react";
import InternetObject from "internet-object";
import Editor from "./Editor";
import SplitPane from "react-split-pane";
import decounce from "lodash.debounce";
import "./Playground.scss";

export default class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defCode: "",
      ioCode: "",
      jsonCode: "",
    };
    this.onIOChange = decounce(this.onIOChange, 500);
  }

  render() {
    return (
      <div className="playground">
        <div className="editor-panel">{this.renderPanels()}</div>
      </div>
    );
  }

  renderPanels = () => {
    const showDefinitions = this.props.showDefinitions;
    if (showDefinitions) {
      return (
        <SplitPane split="vertical" defaultSize="33.3%">
          {this.renderDefPan()}
          <SplitPane
            split="vertical"
            defaultSize="50%"
            onChange={this.onChange}
          >
            {this.renderDocPan()}
            {this.renderOutputPan()}
          </SplitPane>
        </SplitPane>
      );
    }
    return (
      <SplitPane split="vertical" defaultSize="50%" onChange={this.onChange}>
        {this.renderDocPan()}
        {this.renderOutputPan()}
      </SplitPane>
    );
  };

  renderDefPan = () => {
    return (
      <Editor
        title="Definitions"
        code={this.state.defCode}
        onChange={this.onIOChange}
      />
    );
  };

  renderDocPan = () => {
    return (
      <Editor
        title="Internet Object"
        code={this.state.ioCode}
        onChange={this.onIOChange}
      />
    );
  };

  renderOutputPan = () => {
    return (
      <Editor
        title="JSON"
        language="json"
        code={this.state.jsonCode}
        readOnly
      />
    );
  };

  onIOChange = (ioCode) => {
    try {
      const io = new InternetObject(ioCode);
      if (io.data === undefined) {
        return this.updateCode(ioCode, "[no-data]");
      }
      let jsonCode = JSON.stringify(io.data, null, 2);
      this.updateCode(ioCode, jsonCode);
    } catch (error) {
      this.updateCode(ioCode, error.message, true);
      console.error(error);
    }
  };

  updateCode = (ioCode, jsonCode = "", isError = false) => {
    this.setState({ ioCode, jsonCode });
  };
}
