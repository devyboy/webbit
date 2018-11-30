import React, { Component } from "react";
import firebase from "firebase";

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    downVote() {
        return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes - 1 });
    }

    upVote() {
        return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes + 1 });
    }

    render() {
        return(
            <div className="thread-object" key={this.props.key}>
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
                    <div className="thread-author">Posted by: {this.props.author}</div>
                </div>
            </div>
        );
    }
}

export default Thread;