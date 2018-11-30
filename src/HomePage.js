import React, { Component } from 'react';
import firebase from "firebase";
import './App.css';
import { Link } from "react-router-dom";
import Thread from './Thread';
import NewThread from "./NewThread";
import Loading from "./loading.svg";
import ReactLoading from 'react-loading';
import { Modal, Button } from 'react-bootstrap';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: false,
      open: false,
    };
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
      else {
        this.setState({ threads: false });
      }
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
          <Modal style={{ color: "white" }} show={this.state.open} onHide={() => this.setState({ open: false })}>
            <Modal.Header style={{ backgroundColor: "#3d4148" }} >
              <Modal.Title style={{fontSize: "1.5em"}}>
                Submit a new thread
              </Modal.Title>
            </Modal.Header>
            <NewThread closeModal={() => this.setState({ open: false })} userObject={this.props.userObject} />
          </Modal>
          {this.props.userObject 
            ? 
            <div className="App-settings">
              <Link className="account-name" to={"/settings"}> Hi {this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"))}!</Link>
              <div className="new-post" onClick={() => this.setState({ open: true })}>New Post</div>
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
              <h1>There are no threads, feel free to make one!</h1>
            }
            {this.state.threads === null && <ReactLoading type={"spin"} color={"white"} height={150} width={150} />}
          </header>
        </div>
    );
  }
}

export default HomePage;
