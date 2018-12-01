import React, { Component } from "react";
import firebase from "firebase";
import {
    Link, Redirect
  } from "react-router-dom";
import ReactLoading from "react-loading";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import TimeAgo from 'react-timeago'
import './App.css';
import Upvote from "./upvote.png";
import Downvote from "./downvote.png";
import DownvoteGrey from "./downvotegrey.png";
import UpvoteGrey from "./upvotegrey.png";


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentThread: false,
            deleted: false
        };
    }

    componentDidMount() {
        firebase.database().ref(`/threads/${this.props.match.params.tid}`).on("value", (snapshot) => {
            if (snapshot.val() === null) {
                this.setState({ currentThread: null });
            } 
            else {
                this.setState({ currentThread: snapshot.val() });
            }
        });
    }

    deleteThread() {
        firebase.database().ref(`/threads/${this.props.match.params.tid}`).remove();
        this.setState({deleted: true});
    }

    confirmDelete() {
        console.log("Hello?");
        confirmAlert({
            title: 'Confirm to delete this thread',
            message: 'Hope you know what you are doing',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.deleteThread(),
                style: {background: "#f76133"}
              },
              {
                label: 'No',
                onClick: () => null
              }
            ]
        })
    }

    render() {
        // If the props haven't been recieved yet, dont render anything until they arrive.
        if (this.props.userObject === false) {
            return(
                <div className="App">
                    <div className="App-header">
                        <ReactLoading type={"spin"} color={"white"} height={150} width={150} />
                    </div>
                </div>
            );
        }

        if (this.state.deleted == true) {
            return(
                <Redirect to={"/home"} />
            );
        }

        return (
            <div className="App">
                <div className="App-topbar">
                    <h1 className="App-title" onClick={() => window.location.href = "/home"}>Webbit</h1>
                    {this.props.userObject 
                        ? 
                        <div className="App-settings">
                            <Link className="account-name" to={"/settings"}> Hi {this.props.userObject.displayName || this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"))}!</Link>
                            {this.state.currentThread.author == this.props.userObject.displayName  || this.state.currentThread.author == this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"))
                                ?
                                <div className="delete-thread" onClick={() => this.confirmDelete()}>
                                    Delete Thread
                                </div>
                                :
                                <div></div> // placeholder since js expects code
                            }
                            
                            <div className="sign-out" onClick={() => firebase.auth().signOut()}>
                                Logout
                            </div>
                        </div>
                        :
                        <div className="App-settings">
                            <div className="account-name" >Login to enable submissions and voting!</div>
                            <Link className="sign-in" to="/login">
                                Login
                            </Link>
                        </div>
                    }
                </div>
                {this.props.userObject
                    ?
                    <div className="App-header">
                        {this.state.currentThread === null && 
                            <ReactLoading type={"spin"} color={"white"} height={150} width={150} />
                        }
                        <div className="thread-page-container">
                            <div className="thread-page-title">
                                {this.state.currentThread.title}
                                {/* <div style={{ display: "inline-block", marginLeft: '.75em', verticalAlign: "middle" }}>
                                    <div onClick={this.upVote.bind(this)} className="upvote">
                                        <img src={this.state.upVoted ? Upvote : UpvoteGrey} style={{height: 15}} />
                                    </div>
                                    <div style={{ fontSize: ".45em" }}>{console.log(this.state.currentThread.upvotes)}</div>
                                    <div onClick={this.downVote.bind(this)} className="downvote">
                                        <img src={this.state.downVoted ? Downvote : DownvoteGrey} style={{height: 15}} />
                                    </div>
                                </div> */}
                            </div>
                            <div className="thread-page-author">
                                {this.state.currentThread &&
                                    <div>
                                        Posted by {this.state.currentThread.author + " "}
                                        <TimeAgo live={false} date={new Date(this.state.currentThread.date * 1000)} />
                                    </div>
                                }
                            </div>
                            <hr />
                            <div className="thread-page-content">{this.state.currentThread.content}</div>
                            <hr />
                            <div className="comments">

                            </div>
                            <form className="add-comment">
                                <lable>
                                    Comment:
                                    <input type="text" name="comment" />
                                </lable>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="App-header">
                        {this.state.currentThread === null && 
                            <ReactLoading type={"spin"} color={"white"} height={150} width={150} />
                        }
                        <div className="thread-page-container">
                            <div className="thread-page-title">
                                {this.state.currentThread.title}
                                {/* <div style={{ display: "inline-block", marginLeft: '.75em', verticalAlign: "middle" }}>
                                    <div onClick={this.upVote.bind(this)} className="upvote">
                                        <img src={this.state.upVoted ? Upvote : UpvoteGrey} style={{height: 15}} />
                                    </div>
                                    <div style={{ fontSize: ".45em" }}>{console.log(this.state.currentThread.upvotes)}</div>
                                    <div onClick={this.downVote.bind(this)} className="downvote">
                                        <img src={this.state.downVoted ? Downvote : DownvoteGrey} style={{height: 15}} />
                                    </div>
                                </div> */}
                            </div>
                            <div className="thread-page-author">
                                {this.state.currentThread &&
                                    <div>
                                        Posted by {this.state.currentThread.author + " "}
                                        <TimeAgo live={false} date={new Date(this.state.currentThread.date * 1000)} />
                                    </div>
                                }
                            </div>
                            <hr />
                            <div className="thread-page-content">{this.state.currentThread.content}</div>
                            <hr />
                            <div className="comments">

                            </div>
                        </div>
                    </div>
                }
                <div className="App-bottombar">
                    <p style={{color: "white", textAlign: "center", padding: "10px", fontSize: "15px"}}>
                    Made by <a href="https://github.com/devyboy" target="_blank" rel="noopener noreferrer">Dev</a>, <a href="https://github.com/mbillone" target="_blank" rel="noopener noreferrer">Matt</a>, and <a href="https://github.com/vgutta" target="_blank" rel="noopener noreferrer">Vineeth</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default Settings;