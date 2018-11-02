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
      thirdParty: null,
    }
  }

  signIn(user, pass) {
    firebase.auth().signInWithEmailAndPassword(user, pass).then((result) => {
      this.setState({ email: firebase.auth().currentUser.email, error: "", thirdParty: false, });
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

  logOut() {
    firebase.auth().signOut();
    window.location.reload();
  }

  googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.setState({ email: result.user.email, error: "", thirdParty: true, });
      firebase.auth().currentUser.sendEmailVerification();
    }).catch((error) => {
      alert(error.message);
    });
  }

  facebookSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.setState({ email: result.user.email, error: "", thirdParty: true, });
    }).catch((error) => {
      alert(error.message);
    });
  }

  twitterSignIn() {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.setState({ email: result.additionalUserInfo.username, error: "", thirdParty: true, });
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

  handleNewPassChange(event) {
    this.setState({ newPassword: event.target.value });
  }

  changePassword() {
    firebase.auth().currentUser.updatePassword(this.state.newPassword).then((result) => {
      this.setState({ error: "Password successfully changed. I hope you remembered it!", color: "green" });
    }, (error) => {
      this.setState({ error: error.message, color: "red" });
    });
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
        {this.state.email
          ?
          <div>
            {this.state.thirdParty
              ?
              <p> Welcome {this.state.email}! <br /> You signed in with third party authentication so you can't change your password. </p>
              :
              <p> Welcome {this.state.email}! <br /> You can change your password below. </p>
            }
            {!this.state.thirdParty
              &&
              <form className="form">
                <label>
                  <input type="password" value={this.state.newPassword} onChange={this.handleNewPassChange.bind(this)} placeholder="New Password"/>
                </label>
              </form>
            }
            <div className="button-group">
              {!this.state.thirdParty
                &&
                <div
                    className="button"
                    onClick={() => this.changePassword()}
                >
                    Change Password
                </div>
              }
              <div
                  className="button"
                  onClick={() => this.logOut()}
              >
                  Log Out
              </div>
            </div>
            <p style={{ color: this.state.color }} className="error">{this.state.error}</p>
          </div>
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
