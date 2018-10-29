import React, { Component } from 'react';
import './App.css';
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
      email: null,
      error: "",
      color: "",
    }
  }

  signIn(user, pass) {
    firebase.auth().signInWithEmailAndPassword(user, pass).then((result) => {
      this.setState({ email: firebase.auth().currentUser.email, error: "" });
    }, (error) => {
      this.setState({ error: error.message, color: "red" })
    });
  }

  register(user, pass) {
    firebase.auth().createUserWithEmailAndPassword(user, pass).then((result) => {
      this.setState({ error: "You've registered a new account and may now sign in with it.", color: "green" });
    }, (error) => {
      this.setState({ error: error.message, color: "red" });
    });
  }

  logOut() {
    firebase.auth().signOut();
    window.location.reload();
  }

  handleUserChange(event) {
    this.setState({ user: event.target.value })
  }

  handlePassChange(event) {
    this.setState({ password: event.target.value });
  }

  handleNewPassChange(event) {
    this.setState({ newPassword: event.target.value });
  }

  changePassword() {
    firebase.auth().currentUser.updatePassword(this.state.newPassword).then((result) => {
      this.setState({ error: "Password successfully changed. I hope you remembered it!", color: "green" })
    }, (error) => {
      this.setState({ error: error.message, color: "red" })
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
        {this.state.email
          ?
          <div>
            <p> Welcome {this.state.email}! You can change your password or log out. </p>
            <form className="form">
              <label>
                <input type="password" value={this.state.newPassword} onChange={this.handleNewPassChange.bind(this)} placeholder="New Password"/>
              </label>
            </form>
            <div className="button-group">
              <div
                  className="button"
                  onClick={() => this.changePassword()}
              >
                  Change Password
              </div>
              <div
                  className="button"
                  onClick={() => this.logOut()}
              >
                  Log Out
              </div>
            </div>
          </div>
          :
          <div>
          <p> Welcome to WebSec Reddit, if you have an account, please sign in. If not, please register one! </p>
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
          </div>
          </div>
        }
        <p style={{ color: this.state.color }} className="error">{this.state.error}</p>
        </header>
      </div>
    );
  }
}

export default App;
