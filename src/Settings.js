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
            return(
                <Redirect to={"/"} />
            );
        }

        return (
            <div className="App">
                <p>Testing</p>
            </div>
        );
        
        /*
        if (this.props.userObject) {
            return(
                <Redirect to={"/"} />
            );
        }
        */
        
    }
}

export default Settings;