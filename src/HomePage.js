import React, { Component } from 'react';
import firebase from "firebase";
import './App.css';
import { Link } from "react-router-dom";
import Thread from './Thread';
import Loading from "./loading.svg";
import ReactLoading from 'react-loading';


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
      this.setState({ threads: Object.entries(snapshot.val()) });
    });
  }

  render() {
    if (this.props.userObject === false) {
      return(
        <div className="App">
            <div className="App-header">
                <ReactLoading type={"spin"} color={"white"} height={150} width={150} />
            </div>
        </div>
      );
    }
    return(
        <div className="App">
          <h1 className="App-title" onClick={() => window.open("https://github.com/devyboy/websec-reddit")}>Webbit</h1>
          {this.props.userObject 
            ? 
            <div className="App-settings">
              <Link className="account-name" to={"/settings"}> Hi {this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"))}!</Link>
              <Link className="new-post" to={'/new'}>New Post</Link>
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
            {this.state.threads
              ? 
              this.state.threads.map((thread, key) => {
                return(
                  <div key={key}>
                    <h1>{thread[1].title}</h1>
                    <p>{thread[1].content}</p>
                  </div>
                );
              })
              :
              <ReactLoading type={"spin"} color={"white"} height={150} width={150} />
            }
          </header>
        </div>
    );
  }
}

export default HomePage;
