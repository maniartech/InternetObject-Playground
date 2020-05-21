import React, { Component } from "react";
import checkSquare from "../../static/img/check-square-solid.svg";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <header className="app-header">
        <div className="row">
          <div className="col left">
            {/* <a href="/" className="logo pull-left"><img src={ logo } alt="InternetObject Playground"/></a> */}
          </div>

          <div className="col right">
            <ul className="menu-link pull-right">
              <li>
                <button
                  onClick={
                    this.props.onDefinitionsClick &&
                    this.props.onDefinitionsClick
                  }
                >
                  <img src={checkSquare} width="16" />
                  Definitions
                </button>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </header>
    );
  }
}
