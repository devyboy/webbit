import React, { Component } from "react";
import firebase from "firebase";
import Upvote from "../images/upvote.png";
import Downvote from "../images/downvote.png";
import DownvoteGrey from "../images/downvotegrey.png";
import UpvoteGrey from "../images/upvotegrey.png";
import '../css/App.css';


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
            // If the post isn't downvoted already
            if (this.props.downvoted === undefined || !Object.keys(this.props.downvoted).includes(this.props.userObject.uid)) {
                this.setState({downVoted: true, upVoted: false});
                // Remove the user from the list of users who upvoted the post
                firebase.database().ref(`/threads/${this.props.id}/upvoted`).child(this.props.userObject.uid).remove();
                // Add the user to the list of users who downvoted the post 
                firebase.database().ref(`/threads/${this.props.id}/downvoted`).update({ [this.props.userObject.uid]: true });
                if (this.state.upVoted) {
                    // If they had the post upvoted already and now downvote it, decrease the vote number by 2 
                    return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes - 2 });

                }
                else {
                    // If they haven't voted on the post already, subtract the vote number by 1
                    return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes - 1 });
                }
            }
            // If they have already downvoted it, just cancel the downvote
            else if (Object.keys(this.props.downvoted).includes(this.props.userObject.uid)){
                this.setState({ downVoted: false });
                firebase.database().ref(`/threads/${this.props.id}/downvoted`).child(this.props.userObject.uid).remove();
                return firebase.database().ref(`/threads/${this.props.id}/`).update({ upvotes: this.props.upvotes + 1 });
            }
        }
    }

    upVote() {
        // Same as above but backwards
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
        if (this.props.userObject) {
            if (this.props.downvoted) {
                // If they downvoted the post previously, show highlight the downvote arrow to indicate this
                if (Object.keys(this.props.downvoted).includes(this.props.userObject.uid)){
                    this.setState({ downVoted: true });
                }
            }
            // Same as above but backwards
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