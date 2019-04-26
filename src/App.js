import React, { Component } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Settings from "./pages/Settings";
import ThreadPage from "./pages/ThreadPage"
import FourOhFour from "./pages/FourOhFour";
import './css/App.css';
import { yeet } from "./config.js";

// Firebase Credentials
var config = {
    apiKey: yeet.apiKey,
    authDomain: yeet.authDomain,
    databaseURL: yeet.databaseURL,
    projectId: yeet.projectId,
    storageBucket: yeet.storageBucket,
    messagingSenderId: yeet.messagingSenderId
  };

firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: false,
        };
        // When the user logs in, set userObject to them
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ userObject: user });
        });
    }

    render() {
        return(
            <Router>
                <Switch>
                        <Route exact path="/" render={(props) => <HomePage {...props} userObject={this.state.userObject} />} />
                        <Route exact path="/home" render={(props) => <HomePage {...props} userObject={this.state.userObject} />} />
                        <Route exact path="/home/:tid" render={(props) => <ThreadPage {...props} userObject={this.state.userObject} />} />
                        <Route path="/login" render={(props) => <Login {...props} userObject={this.state.userObject} />} />
                        <Route path="/settings/" render={(props) => <Settings {...props} userObject={this.state.userObject} />} />
                        <Route component={FourOhFour} />
                </Switch>
            </Router>
        );
    }
}

export default App;