import React, { Component } from "react";
import firebase from "firebase";
import {
    Link,
  } from "react-router-dom";
import ReactLoading from "react-loading";
import TimeAgo from 'react-timeago'
import './App.css';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentThread: false,
        };
    }

    componentDidMount() {
        firebase.database().ref(`/threads/${this.props.match.params.tid}`).on("value", (snapshot) => {
            if (snapshot.val() === null) {
                this.setState({ currentThread: null });
            } 
            else {
                this.setState({ currentThread: snapshot.val() });
            }
        });
    }

    render() {
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
                </div>
                <div className="App-header">
                    {this.state.currentThread === null && <ReactLoading type={"spin"} color={"white"} height={150} width={150} />}
                    <div>
                        <h1>{this.state.currentThread.title}</h1>
                        <h3>{this.state.currentThread.author}</h3>
                        <TimeAgo live={false} date={new Date(this.state.currentThread.date * 1000)} />
                        <h2>{this.state.currentThread.content}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;