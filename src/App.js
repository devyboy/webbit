import React, { Component } from 'react';
import './App.css';
import HomePage from "./HomePage";
import ChangePassword from './ChangePassword';
import firebase from "firebase";

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
      user: "",
      password: "",
      newPassword: "",
      userObject: null,
      loggedIn: false,
      error: "",
      color: "",
      thirdParty: null,
    }
  }

  signIn(user, pass) {
    firebase.auth().signInWithEmailAndPassword(user, pass).then((result) => {
      this.setState({ userObject: firebase.auth().currentUser, error: "", thirdParty: false, loggedIn: true});
    }, (error) => {
      this.setState({ error: error.message, color: "red" });
    });
  }

  register(user, pass) {
    firebase.auth().createUserWithEmailAndPassword(user, pass).then((result) => {
      this.setState({ error: "You've registered a new account and may now sign in with it.", color: "green" });
      firebase.auth().currentUser.sendEmailVerification();
    }, (error) => {
      this.setState({ error: error.message, color: "red" });
    });
  }

  googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.setState({ userObject: result.user, error: "", thirdParty: true, loggedIn: true});
      firebase.auth().currentUser.sendEmailVerification();
    }).catch((error) => {
      alert(error.message);
    });
  }

  facebookSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.setState({ userObject: result.user, error: "", thirdParty: true, loggedIn: true});
    }).catch((error) => {
      alert(error.message);
    });
  }

  twitterSignIn() {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.setState({ userObject: result.additionalUserInfo, error: "", thirdParty: true, loggedIn: true});
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

  componentWillUnmount() {
    firebase.auth().signOut();
  }

  componentDidMount() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        {this.state.loggedIn
          ?
          <HomePage
            userObject={this.state.userObject}
          />
          :
          <div>
            <h2> Welcome to WebSec RBAC <br/> If you have an account, please sign in. If not, please register one! </h2>
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
                  onClick={() => this.register(this.state.user, this.state.password)}
              >
                  Register
              </div>
              <div
                  className="button"
                  onClick={() => this.forgotPassword()}
              >
                  Forgot Password
              </div>
            </div>
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
          </div>
        }
        </header>
      </div>
    );
  }
}

export default App;
