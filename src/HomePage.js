import React, { Component } from 'react';
import firebase from "firebase";
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
    return(
        <div>
          {this.props.userObject && 
            <div onClick={() => firebase.auth().signOut()}>
            sign out
          </div>
          }
          {this.state.threads.map((thread, key) => {
            return(
              <div key={key}>
                <h1>{thread[1].title}</h1>
                <p>{thread[1].content}</p>
              </div>
            );
          })}
        </div>
    );
  }
}

export default HomePage;
