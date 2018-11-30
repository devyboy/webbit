import React, { Component } from "react";
import firebase from "firebase";
import { type } from "os";

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upVoted: false,
            downVoted: false
        };
        let comments = this.props.thread[1].comments;
        console.log(comments.numComments);
    }

    downVote() {
        if (this.props.userObject && !this.state.downVoted) {
            this.setState({downVoted: true, upVoted: false});
            return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes - 1 });
        }
    }

    upVote() {
        if (this.props.userObject && !this.state.upVoted) {
            this.setState({upVoted: true, downVoted: false});
            return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes + 1 });
        }
    }

    render() {
        return(
            <div className="thread-object">
                <div className="thread-upvote-container">
                    <div onClick={this.upVote.bind(this)} className="upvote">
                        ↑
                    </div>
                    {this.props.upvotes}
                    <div onClick={this.downVote.bind(this)}className="downvote">
                        ↓
                    </div>
                </div>
                <div className="thread-text">
                    <div className="thread-title">{this.props.title}</div>
                    <div className="thread-author" style={{fontSize: 15}}>Posted by: {this.props.author}</div>
                    <div className="comments">{this.props.comments}</div>
                    {/*<div classname="thread-content" style={{fontSize: 20}}>{this.props.content}</div>*/}
                </div>
            </div>
        );
    }
}

export default Thread;