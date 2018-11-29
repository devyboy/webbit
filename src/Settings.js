import React, { Component } from "react";
import './App.css';
import firebase from "firebase";
import {
    Redirect,
  } from "react-router-dom";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        
        if (this.props.userObject === false) {
            return null;
        }
        
        return (
            <div className="App">
                <p>Testing</p>
            </div>
        );
    }
}

export default Settings;