import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import ChangePassword from './ChangePassword';
import firebase from "firebase";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: null,

    };
  }

  logOut() {
    firebase.auth().signOut();
    window.location.reload();
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

  render() {
    return(
      <Router>
        <div>
          {this.props.userObject.email
            ?
            <p> Welcome {this.props.userObject.email}! </p>
            :
            <p> Welcome </p>
          }
          <div className="button-group">
            {!this.state.thirdParty
              &&
              <div
                  className="button"
                  onClick={this.changePassword.bind(this)}
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
      </Router>
    );
  }
}

export default HomePage;
