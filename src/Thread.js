import React, { Component } from "react";

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return(<h1>Thread ID: {this.props.match.params.tid}</h1>);
    }
}

export default Thread;