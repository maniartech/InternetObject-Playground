import React, { Component } from "react";
import Header from "./component/header/Header";
import Playground from "./component/playground/Playground";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDefinitions: false,
    };
  }
  render() {
    const { showDefinitions } = this.state;
    return (
      <div className="app">
        <Header
          showDefinitions={showDefinitions}
          onDefinitionsClick={this.onDefinitionsClick}
        />
        <Playground showDefinitions={showDefinitions} />
      </div>
    );
  }

  onDefinitionsClick = () => {
    const showDefinitions = !this.state.showDefinitions;
    this.setState({ showDefinitions });
  };
}
