import React, { Component } from 'react';
import firebase from "firebase";
import './App.css';
import { Link } from "react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: null,
    };
  }

  handleNewPassChange(event) {
    this.setState({ newPassword: event.target.value });
  }

  changePassword(e) {
    firebase.auth().currentUser.updatePassword(this.state.newPassword).then((result) => {
      this.setState({ error: "Password successfully changed. I hope you remembered it!", color: "green" });
    }, (error) => {
      this.setState({ error: error.message, color: "red" });
    });
  }

  componentDidMount() {
    firebase.database().ref("/threads/").on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({ threads: Object.entries(snapshot.val()) });
      }
    });
  }

  render() {
    if (this.props.userObject == false) {
      return null;
    }
    return(
        <div className="App">
          <h1 className="App-title" onClick={() => window.open("https://github.com/devyboy/websec-reddit")}>Webbit</h1>
          {this.props.userObject 
            ? 
            <div className="App-settings">
              <Link className="account-name" to={"/settings"}>{this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"))}</Link>
              <div className="sign-out" onClick={() => firebase.auth().signOut()}>
                Logout
              </div>
            </div>
            :
            <div className="App-settings">
              <Link className="sign-in" to="/login">
                Login
              </Link>
            </div>
          }
          <header className="App-header">
            {<h2>There are no threads at this time, feel free to make one!</h2> || this.state.threads.map((thread, key) => {
              return(
                <div key={key}>
                  <h1>{thread[1].title}</h1>
                  <p>{thread[1].content}</p>
                </div>
              )
            })}
          </header>
        </div>
    );
  }
}

export default HomePage;
