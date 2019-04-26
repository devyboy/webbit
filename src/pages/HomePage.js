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
    // When the component mounts, grab the threads from Firebase and put it in the state
    firebase.database().ref("/threads/").on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({ threads: Object.entries(snapshot.val()) });
      }
      else {
        // If there aren't any threads, set it to false 
        this.setState({ threads: false }); 
      }
    });
  }

  render() {
    if (this.props.userObject === false) {
      // If the user object hasn't been recieved from the props, show the loading spinner
      return(
        <div className="App">
            <div className="App-header">
                <ReactLoading type={"spin"} color={"white"} height={150} width={150} />
            </div>
        </div>
      );
    }

    if (this.state.threads) {
      // Order threads from latest to oldest
      this.state.threads.sort().reverse(); 
    }
    // Once the content is done loading, replace the loading spinner with the page
    return(
        <div className="App">
          <div className="App-topbar">
            <h1 className="App-title" onClick={() => window.location.href = "/home"}>Webbit</h1>
            {this.props.userObject 
              ? 
              // If the user is logged in, display the welcome message 
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
              // If they're not logged in, show a message to encourage them
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
            {(this.state.threads === false) 
              // threads being false means there aren't any, threads being null means something went wrong
              ?
              <h1>There are no threads</h1>
              :
              <div className="thread-holder">
                {(this.state.threads === null) 
                  ? 
                  null 
                  :
                  this.state.threads.map((thread, key) => {
                    return(
                      // If there are threads in the state, send it the Thread component
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
              Made by <a href="https://github.com/devyboy" target="_blank" rel="noopener noreferrer">Dev</a> and <a href="https://github.com/vgutta" target="_blank" rel="noopener noreferrer">Vineeth</a>
            </p>
          </div>
        </div>
    );
  }
}

export default HomePage;
