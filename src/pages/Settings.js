import React, { Component } from "react";
import firebase from "firebase";
import {
    Redirect,
} from "react-router-dom";
import ReactLoading from "react-loading";
import { Glyphicon } from "react-bootstrap";
import Snackbar from '@material-ui/core/Snackbar';
import '../css/App.css';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            newPasswordConfirm: "",
            color: "",
            open: false,
            snackMessage: ""

        };
        
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handlePassChangeConfirm = this.handlePassChangeConfirm.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    handlePassChange(event) {
        this.setState({ newPassword: event.target.value });
    }

    handlePassChangeConfirm(event) {
        this.setState({ newPasswordConfirm: event.target.value });
    }
    // Changes the user's password, doesn't work for Google/Twitter/Facebook sign ins
    changePassword(e) {
        if (this.state.newPassword === this.state.newPasswordConfirm) {
            firebase.auth().currentUser.updatePassword(this.state.newPassword).then(() => {
                this.setState({ open: true, snackMessage: "Password successfully changed", newPassword: "", newPasswordConfirm: "" });
              }, (error) => {
                this.setState({ snackMessage: error.message, open: true });
              });
        }
        else {
            this.setState({ open: true, snackMessage: "The passwords do not match"});
        }
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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={() => this.setState({ open: false })}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackMessage}</span>}
                />
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
                    <div>Change Password</div>
                    <input style={{color: "black"}} type="password" value={this.state.newPassword} onChange={this.handlePassChange} placeholder="Password"/>
                    <input style={{color: "black"}} type="password" value={this.state.newPasswordConfirm} onChange={this.handlePassChangeConfirm} placeholder="Confirm Password"/>
                    <div
                            className="button"
                            onClick={this.changePassword}
                        >
                            Submit
                    </div>
                    <p style={{ color: this.state.color }} className="error">{this.state.error}</p>
                </div>
            </div>
        );
    }
}

export default Settings;