import React, { Component } from "react";
import firebase from "firebase";
import {
    Link, Redirect
  } from "react-router-dom";
import ReactLoading from "react-loading";
import TimeAgo from 'react-timeago'
import { Modal, Button, Glyphicon } from 'react-bootstrap';
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
            showDelete: false,
            deleted: false,
            comment: ''
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
        this.setState({ deleted: true });
    }

    handleChange(event) {
        this.setState({comment: event.target.value});
    }
    

    handleSubmit(e) {
        let user = this.props.userObject.displayName || this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"));
        let date = Math.round((new Date()).getTime() / 1000);
        let data = 
        {
            "author" : user,
            "content" : this.state.comment,
            "upvotes" : 420,
            "date": date,
        }

        let newKey = firebase.database().ref().child(`/threads/`).push().key;
        let updates = {};
        updates[`/threads/${this.props.match.params.tid}/comments/` + newKey] = data;
        firebase.database().ref().update(updates);
        this.setState({comment: ''});
        e.preventDefault();
    }

    render() {
        // If the props haven't been recieved yet, dont render anything until they arrive.
        if (this.props.userObject === false || this.state.currentThread === false) {
            return(
                <div className="App">
                    <div className="App-header">
                        <ReactLoading type={"spin"} color={"white"} height={150} width={150} />
                    </div>
                </div>
            );
        }

        if (this.state.deleted) {
            return(<Redirect to="/home" />);
        }

        let comments = [];

        if (this.state.currentThread.comments !== undefined) {
            for (let commentID in this.state.currentThread.comments) {
                comments.push(this.state.currentThread.comments[commentID]);
            }
            comments.reverse();
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
                                <div className="delete-thread" onClick={() => this.setState({ showDelete: true })}>
                                    <Glyphicon glyph="trash" />
                                </div>
                                :
                                <div></div> // placeholder since js expects code
                            }
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
                <header className="App-header">
                    <Modal style={{ color: "white" }} show={this.state.showDelete} onHide={() => this.setState({ showDelete: false })}>
                        <Modal.Header style={{ backgroundColor: "#3d4148" }} >
                        <Modal.Title style={{fontSize: "2em"}}>
                            Delete thread?
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: "#3d4148" }} >
                            <h4>Are you sure you want to delete this thread? You can't undo this action.</h4>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: "#3d4148" }} >
                            <Button onClick={() => this.setState({ showDelete: false })} style={{ marginRight: '.5em'}} bsSize="large">Close</Button>
                            <Button onClick={this.deleteThread.bind(this)} bsSize="large" bsStyle="danger">Delete</Button>
                        </Modal.Footer>
                    </Modal>
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
                        <div className="thread-page-content">
                            {this.state.currentThread.content}
                            <hr />
                        </div>
                    </div>
                    <div className="thread-page-comment-container">
                        {comments.map((comment, key) => {
                            return (
                                <div className="thread-page-comment" key={key}>
                                    <div className="thread-page-comment-content">{comment.content}</div>
                                    <div className="thread-page-author" style={{ fontSize: 15 }}>
                                        {comment.author + " "}
                                        <TimeAgo live={false} date={new Date(comment.date * 1000)} />
                                    </div>   
                                </div>
                            );
                        })}
                    </div>
                    {this.state.currentThread && this.props.userObject &&
                        <form className="submit-form" onSubmit={this.handleSubmit.bind(this)}>
                            <label>
                                <input style={{ color: "black" }} value={this.state.comment} onChange={this.handleChange.bind(this)} placeholder="Comment here" />
                            </label>
                            <input style={{ color: "black" }} type="submit" value="Submit" />
                        </form>
                    }
                </header>
                <div className="App-bottombar">
                    <p style={{ color: "white", textAlign: "center", padding: "10px", fontSize: "15px" }}>
                        Made by <a href="https://github.com/devyboy" target="_blank" rel="noopener noreferrer">Dev</a>, <a href="https://github.com/mbillone" target="_blank" rel="noopener noreferrer">Matt</a>, and <a href="https://github.com/vgutta" target="_blank" rel="noopener noreferrer">Vineeth</a>
                    </p>
                </div>
            </div>
        );
    }
}

export default Settings;