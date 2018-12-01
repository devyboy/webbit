import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom"
import TimeAgo from 'react-timeago'
import Upvote from "./upvote.png";
import Downvote from "./downvote.png";
import DownvoteGrey from "./downvotegrey.png";
import UpvoteGrey from "./upvotegrey.png";



class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upVoted: false,
            downVoted: false
        };
    }

    downVote() {
        if (this.props.userObject && !this.state.downVoted) {
            this.setState({downVoted: true, upVoted: false});
            return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.state.originalUpvote - 1 });
        }
        else if (this.props.userObject && this.state.downVoted) {
            this.setState({ downVoted: false });
            return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes + 1 });
        }
    }

    upVote() {
        if (this.props.userObject && !this.state.upVoted) {
            this.setState({upVoted: true, downVoted: false});
            return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.state.originalUpvote + 1 });
        }
        else if (this.props.userObject && this.state.upVoted) {
            this.setState({ upVoted: false });
            return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes - 1 });
        }
    }

    componentDidMount() {
        this.setState({ originalUpvote: this.props.upvotes });
    }

    render() {
        return(
            <div className="thread-object">
                <div className="thread-upvote-container">
                    <div onClick={this.upVote.bind(this)} className="upvote">
                        <img src={this.state.upVoted ? Upvote : UpvoteGrey} style={{height: 15}} />
                    </div>
                    {this.props.upvotes}
                    <div onClick={this.downVote.bind(this)} className="downvote">
                        <img src={this.state.downVoted ? Downvote : DownvoteGrey} style={{height: 15}} />
                    </div>
                </div>
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