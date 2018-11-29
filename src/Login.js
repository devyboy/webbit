import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";
import {
    Redirect,
  } from "react-router-dom";

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            newPassword: "",
            error: "",
            color: "",
            thirdParty: null,
            checked: true,
          }
    }
      
    signIn(user, pass) {
        firebase.auth().signInWithEmailAndPassword(user, pass).then(() => {
            return <Redirect to={"/"} />;
        }, (error) => {
            this.setState({ error: error.message, color: "red" });
        });
    }
    
    register(user, pass) {
        firebase.auth().createUserWithEmailAndPassword(user, pass).then(() => {
            this.state.checked && firebase.auth().currentUser.sendEmailVerification();
        }, (error) => {
            this.setState({ error: error.message, color: "red" });
        });
    }
    
    googleSignIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.setState({ userObject: result.user, error: "" });
            firebase.auth().currentUser.sendEmailVerification();
        }).catch((error) => {
            alert(error.message);
        });
    }
    
    facebookSignIn() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.setState({ userObject: result.user, error: "" });
        }).catch((error) => {
            alert(error.message);
        });
    }
    
    twitterSignIn() {
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.setState({ userObject: result.additionalUserInfo, error: "" });
        }).catch((error) => {
            alert(error.message);
        });
    }
    
    handleUserChange(event) {
        this.setState({ user: event.target.value })
    }
    
    handlePassChange(event) {
        this.setState({ password: event.target.value });
    }
   
    forgotPassword() {
        firebase.auth().sendPasswordResetEmail(this.state.user).then(() => {
            this.setState({ error: "Password reset email sent.", color: "green" });
        }, (error) => {
            this.setState({ error: error.message, color: 'red' })
        });
    }
    
    render() {
        if (this.props.userObject === false) {
            return null;
        }
        if (this.props.userObject) {
            return(
                <Redirect to={"/"} />
            );
        }
        return(
            <div className="App">
                <h1 className="App-title" onClick={() => window.open("https://github.com/devyboy/websec-reddit")}>Webbit</h1>
                <header className="App-header">
                    <h2> If you have an account, sign in. <br /> If not, register one! </h2>
                    <form className="form">
                        <label>
                            <input type="email" value={this.state.user} onChange={this.handleUserChange.bind(this)} placeholder="Email"/>
                        </label>
                        <br/>
                        <label>
                            <input type="password" value={this.state.password} onChange={this.handlePassChange.bind(this)} placeholder="Password"/>
                        </label>
                    </form>
                    <div className="button-group">
                        <div
                            className="button"
                            onClick={() => this.signIn(this.state.user, this.state.password)}
                        >
                            Sign In
                        </div>

                        <div
                            className="button"
                            onClick={() => this.forgotPassword()}
                        >
                            Forgot Password
                        </div>
                    </div>
                    <div
                        className="button"
                        onClick={() => this.register(this.state.user, this.state.password)}
                    >
                        Register
                    </div>
                    <p style={{ marginBottom: 0 }}>Send verification email?</p>
                    <input type={"checkbox"} name={"email"} checked={this.state.checked} onChange={() => this.setState({ checked: !this.state.checked })} />
                    <p style={{ color: this.state.color }} className="error">{this.state.error}</p>
                    <div>
                        <h2>Or sign in with:</h2>
                        <div className="button-group">
                            <div
                                className="third-party"
                                onClick={() => this.googleSignIn()}
                            >
                                <img style={{width: '50px'}} src="https://s18955.pcdn.co/wp-content/uploads/2017/05/Google.png" alt="Google" />
                            </div>
                            <div
                                className="third-party"
                                onClick={() => this.facebookSignIn()}
                            >
                                <img style={{width: '50px'}} src="https://s18955.pcdn.co/wp-content/uploads/2017/05/Facebook.png" alt="Facebook" />
                            </div>
                            <div
                                className="third-party"
                                onClick={() => this.twitterSignIn()}
                            >
                                <img style={{width: '50px'}} src="https://s18955.pcdn.co/wp-content/uploads/2017/05/Twitter.png" alt="Twitter" />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Thread;