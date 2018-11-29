import React, { Component } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import Settings from "./Settings";
import Thread from "./Thread";
import FourOhFour from "./FourOhFour";
import NewThread from "./NewThread";
import ChangePassword from './ChangePassword';
import './App.css';

var config = {
    apiKey: "AIzaSyC03mP6r5qEkEF_UA1eSw1pRPgQLW2nlEU",
    authDomain: "websecrbac.firebaseapp.com",
    databaseURL: "https://websecrbac.firebaseio.com",
    projectId: "websecrbac",
    storageBucket: "websecrbac.appspot.com",
    messagingSenderId: "766124786977"
  };

firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: false,
        };

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
                        <Route exact path="/home/:tid" render={(props) => <Thread {...props} userObject={this.state.userObject} />} />
                        <Route path="/new" render={(props) => <NewThread {...props} userObject={this.state.userObject} />} />
                        <Route path="/login" render={(props) => <Login {...props} userObject={this.state.userObject} />} />
                        <Route path="/settings/" render={(props) => <Settings {...props} userObject={this.state.userObject} />} />
                        <Route path="/changepass" render={(props) => <ChangePassword {...props} userObject={this.state.userObject} />} />
                        <Route component={FourOhFour} />
                </Switch>
            </Router>
        );
    }
}

export default App;