import React, { Component } from "react";
import './App.css';
import firebase from "firebase";
import {
    Redirect,
  } from "react-router-dom";
import ReactLoading from "react-loading";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // If the props are passed down but the user isn't logged in, take them back home.
        if (this.props.userObject === null) {
            return(
                <Redirect to={"/home"} />
            );
        }

        // If the props haven't been recieved yet, dont render anything until they arrive.
        if (this.props.userObject === false) {
            return(
                <div className="App">
                    <div className="App-header">
                        <ReactLoading type={"spin"} color={"white"} height={150} width={150} />
                    </div>
                </div>
            );
        }

        return (
            <div className="App">
                <h1 className="App-title" onClick={() => window.location.href="/home"}>Webbit</h1>
                <div className="App-header">
                    <h1>Testing</h1>
                </div>
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