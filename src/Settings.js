import React, { Component } from "react";
import firebase from "firebase";
import {
    Redirect,
} from "react-router-dom";
import ReactLoading from "react-loading";
import { Glyphicon } from "react-bootstrap";
import './App.css';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    changePassword(e) {
        firebase.auth().currentUser.updatePassword(this.state.newPassword).then((result) => {
          this.setState({ error: "Password successfully changed. I hope you remembered it!", color: "green" });
        }, (error) => {
          alert(error);
        });
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
                    <div className="App-settings">
                        <div className="account-name"> Hi {this.props.userObject.displayName || this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"))}!</div>
                        <div className="sign-out" onClick={() => firebase.auth().signOut()}>
                            <Glyphicon glyph="log-out" />
                        </div>
                    </div>
                </div>                
                <div className="App-header">
                    Settings
                </div>
            </div>
        );
    }
}

export default Settings;