import React, { Component } from "react";
import firebase from "firebase";
import {
    Redirect,
    Link
  } from "react-router-dom";
import ReactLoading from "react-loading";
import './App.css';


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
                <div className="App-topbar">
                    <h1 className="App-title" onClick={() => window.location.href = "/home"}>Webbit</h1>
                    {this.props.userObject 
                        ? 
                        <div className="App-settings">
                            <Link className="account-name" to={"/settings"}> Hi {this.props.userObject.displayName || this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"))}!</Link>
                            <div className="sign-out" onClick={() => firebase.auth().signOut()}>
                                Logout
                            </div>
                        </div>
                        :
                        <div className="App-settings">
                            <div className="account-name" >Login to enable submissions and voting!</div>
                            <Link className="sign-in" to="/login">
                                Login
                            </Link>
                        </div>
                    }
                </div>                <div className="App-header">
                    <h1>Yeet</h1>
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