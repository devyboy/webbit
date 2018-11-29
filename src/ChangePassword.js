import React, { Component } from 'react';
import './App.css';
import firebase from "firebase";

class ChangePassword extends Component {
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

  // componentWillMount() {
  //   if (this.props.location.state.userObject == null) {
  //     window.location.href = "/login";
  //   }
  // }

  render() {
    console.log(this.props)
    return(
      <div>
        <p> Welcome {this.props.userObject.email}! <br /> You can change your password below. </p>
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
          <p style={{ color: this.state.color }} className="error">{this.state.error}</p>
          <div
              className="button"
              onClick={() => this.logOut()}
          >
              Log Out
          </div>
          <p style={{ color: this.state.color }} className="error">{this.state.error}</p>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
