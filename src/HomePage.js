import React, { Component } from 'react';
import firebase from "firebase";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
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
      this.setState({ threads: Object.entries(snapshot.val()) });
    });
  }

  render() {
    if (this.props.userObject == false) {
      return null;
    }
    return(
        <div>
          {this.props.userObject && 
            <div onClick={() => firebase.auth().signOut()}>
            sign out
          </div>
          }
          {this.state.threads.map((thread) => {
            return(<h1>{thread[1].title}</h1>)
          })}
        </div>
    );
  }
}

export default HomePage;
