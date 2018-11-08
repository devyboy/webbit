import React, { Component } from 'react';
import './App.css';
import firebase from "firebase";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logOut() {
    firebase.auth().signOut();
    window.location.reload();
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

  render() {
    return(
      <div>
        {this.state.thirdParty
          ?
          <p> Welcome {this.props.userObject.email}! <br /> You signed in with third party authentication so you can't change your password. </p>
          :
          <p> Welcome {this.props.userObject.email}! <br /> You can change your password below. </p>
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
    );
  }
}

export default HomePage;
