import React, { Component } from 'react';
import firebase from "firebase";
import '../css/App.css';
import { Link } from "react-router-dom";
import Thread from '../components/Thread';
import NewThread from "../components/NewThread";
import ReactLoading from 'react-loading';
import { Modal, Glyphicon } from 'react-bootstrap';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: null,
      open: false,
    };
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

    if (this.state.threads) {
      this.state.threads.sort().reverse(); // Order threads from latest to oldest
    }
    
    return(
        <div className="App">
          <div className="App-topbar">
            <h1 className="App-title" onClick={() => window.location.href = "/home"}>Webbit</h1>
            {this.props.userObject 
              ? 
              <div className="App-settings">
                <div className="account-name"> Hi {this.props.userObject.displayName || this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"))}!</div>
                <div className="new-thread" onClick={() => this.setState({ open: true })}>
                  <Glyphicon glyph="plus" />
                </div>
                <Link className="settings" to="/settings">
                  <Glyphicon glyph="cog" />
                </Link>
                <div className="sign-out" onClick={() => firebase.auth().signOut()}>
                  <Glyphicon glyph="log-out" />
                </div>
              </div>
              :
              <div className="App-settings">
                <div className="account-name" >Login to enable submissions and voting!</div>
                <Link className="sign-in" to="/login">
                  <Glyphicon glyph="log-in" />
                </Link>
              </div>
            }
          </div>
          <Modal style={{ color: "white" }} show={this.state.open} onHide={() => this.setState({ open: false })}>
            <Modal.Header style={{ backgroundColor: "#3d4148" }} >
              <Modal.Title style={{fontSize: "1.5em"}}>
                Submit a new thread
              </Modal.Title>
            </Modal.Header>
            <NewThread closeModal={() => this.setState({ open: false })} userObject={this.props.userObject} />
          </Modal>
          <header className="App-header">
            {(this.state.threads === false) ?
              <h1>There are no threads</h1>
              :
              <div className="thread-holder">
                {(this.state.threads === null) 
                  ? 
                  null 
                  :
                  this.state.threads.map((thread, key) => {
                    return(
                      <Thread
                        key={key}
                        userObject={this.props.userObject}
                        thread={thread}
                        title={thread[1].title}
                        content={thread[1].content}
                        author={thread[1].author}
                        upvotes={thread[1].upvotes}
                        downvoted={thread[1].downvoted}
                        upvoted={thread[1].upvoted}
                        date={thread[1].date}
                        id={thread[0]}
                      />
                    );
                  })
                }
              </div>
            }
          </header>
          <div className="App-bottombar">
            <p style={{color: "white", textAlign: "center", padding: "10px", fontSize: "15px"}}>
              Made by <a href="https://github.com/devyboy" target="_blank" rel="noopener noreferrer">Dev</a>, <a href="https://github.com/mbillone" target="_blank" rel="noopener noreferrer">Matt</a>, and <a href="https://github.com/vgutta" target="_blank" rel="noopener noreferrer">Vineeth</a>
            </p>
          </div>
        </div>
    );
  }
}

export default HomePage;
