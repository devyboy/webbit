import React, { Component } from "react";
import firebase from "firebase";
import '../css/App.css';
import { Modal, Button } from "react-bootstrap";

class NewThread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
        }
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value })
    }
    
    handleContentChange(event) {
    this.setState({ content: event.target.value });
    }

    publishThread() {
        let user = this.props.userObject.displayName || this.props.userObject.email.substring(0, this.props.userObject.email.indexOf("@"));
        let date = Math.round((new Date()).getTime() / 1000);
        let data = 
        {
            "author" : user,
            "comments" : {},
            "content" : this.state.content,
            "title" : this.state.title,
            "upvotes" : 0,
            "downvoted": {},
            "upvoted": {},
            "date": date,
        }

        let newKey = firebase.database().ref().child('/threads/').push().key;
        let updates = {};
        updates["/threads/" + newKey] = data;
        this.props.closeModal();
        return firebase.database().ref().update(updates);
    }

    render() {
        return( 
            <div>
                <Modal.Body style={{ backgroundColor: "#3d4148" }} >
                    <textarea className={"content-input"} value={this.state.title} onChange={this.handleTitleChange.bind(this)} placeholder="Title" cols="58" rows="1">
                    </textarea>
                    <textarea className={"content-input"} value={this.state.content} onChange={this.handleContentChange.bind(this)} placeholder="Content" cols="58" rows="10">
                    </textarea>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#3d4148" }} >
                    <Button onClick={this.props.closeModal} style={{ marginRight: '.5em'}} bsSize="large">Close</Button>
                    <Button onClick={this.publishThread.bind(this)} bsSize="large" bsStyle="success">Post</Button>
                </Modal.Footer>
            </div>
        );
    }
}

export default NewThread;