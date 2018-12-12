import React, { Component } from "react";
import firebase from "firebase";
import Upvote from "./upvote.png";
import Downvote from "./downvote.png";
import DownvoteGrey from "./downvotegrey.png";
import UpvoteGrey from "./upvotegrey.png";
import './App.css';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upVoted: false,
            downVoted: false,
        };
    }

    downVote() {
        if (this.props.userObject) {
            if (this.props.downvoted === undefined || !Object.keys(this.props.downvoted).includes(this.props.userObject.uid)) {
                this.setState({downVoted: true, upVoted: false});
                firebase.database().ref(`/threads/${this.props.id}/upvoted`).child(this.props.userObject.uid).remove();
                firebase.database().ref(`/threads/${this.props.id}/downvoted`).update({ [this.props.userObject.uid]: true });
                if (this.state.upVoted) {
                    return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes - 2 });

                }
                else {
                    return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes - 1 });
                }
            }
            else if (Object.keys(this.props.downvoted).includes(this.props.userObject.uid)){
                this.setState({ downVoted: false });
                firebase.database().ref(`/threads/${this.props.id}/downvoted`).child(this.props.userObject.uid).remove();
                return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes + 1 });
            }
        }
    }

    upVote() {
        if (this.props.userObject) {
            if (this.props.upvoted === undefined || !Object.keys(this.props.upvoted).includes(this.props.userObject.uid)) {
                this.setState({ upVoted: true, downVoted: false });
                firebase.database().ref(`/threads/${this.props.id}/downvoted`).child(this.props.userObject.uid).remove();
                firebase.database().ref(`/threads/${this.props.id}/upvoted`).update({ [this.props.userObject.uid]: true });
                if (this.state.downVoted) {
                    return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes + 2 });
                }
                else {
                    return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes + 1 });
                }
            }
            else if (Object.keys(this.props.upvoted).includes(this.props.userObject.uid)) {
                this.setState({ upVoted: false });
                firebase.database().ref(`/threads/${this.props.id}/upvoted`).child(this.props.userObject.uid).remove();
                return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes - 1 });
            }
        }
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props.userObject) {
            if (this.props.downvoted) {
                if (Object.keys(this.props.downvoted).includes(this.props.userObject.uid)){
                    this.setState({ downVoted: true });
                }
            }
            if (this.props.upvoted) {
                if (Object.keys(this.props.upvoted).includes(this.props.userObject.uid)){
                    this.setState({ upVoted: true });
                }
            }
        }
    }

    render() {
        return (
            <div className="thread-upvote-container">
                <div onClick={this.upVote.bind(this)} className="upvote">
                    <img src={this.state.upVoted ? Upvote : UpvoteGrey} style={{height: 15}} />
                </div>
                {this.props.upvotes}
                <div onClick={this.downVote.bind(this)} className="downvote">
                    <img src={this.state.downVoted ? Downvote : DownvoteGrey} style={{height: 15}} />
                </div>
            </div>
        );
    }
}

export default Settings;