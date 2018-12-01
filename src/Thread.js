import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom"
import UpvoteContainer from "./UpvoteContainer";
import TimeAgo from 'react-timeago'

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upVoted: false,
            downVoted: false
        };
    }

    render() {
        return(
            <div className="thread-object">
                <UpvoteContainer userObject={this.props.userObject} upvotes={this.props.upvotes} id={this.props.id} />
                <Link to={`/home/${this.props.id}`} className="thread-text">
                    <div className="thread-title">{this.props.title}</div>
                    <div className="thread-author" style={{fontSize: 15}}>
                        Posted by: {this.props.author + " "}
                        <TimeAgo live={false} date={new Date(this.props.date * 1000)} />
                    </div>
                    <div className="comments" style={{fontSize: 15}}>{this.props.thread[1].comments.numComments} Comments</div>
                </Link>
            </div>
        );
    }
}

export default Thread;