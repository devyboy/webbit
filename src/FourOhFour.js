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
        console.log(this.props);
        return(<h1>{this.props.location.pathname} not found.</h1>);
    }
}

export default Thread;