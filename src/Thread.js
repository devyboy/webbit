import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Settings from "./Settings";

class Thread extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(<h1>Thread ID: {this.props.match.params.tid}</h1>);
    }
}

export default Thread;