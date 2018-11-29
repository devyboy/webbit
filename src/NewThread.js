import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import './App.css';
import ReactLoading from "react-loading";

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
        let data = 
        {
            "author" : "Devon",
            "comments" : {},
            "content" : this.state.content,
            "title" : this.state.title,
            "upvotes" : 1
        }

        let newKey = firebase.database().ref().child('/threads/').push().key;
        let updates = {};
        updates["/threads/" + newKey] = data;
        
        return firebase.database().ref().update(updates);
    }

    render() {
        if (this.props.userObject === null) {
            return <Redirect to="/home" />
        }
        
        if (this.props.userObject === false) {
            return(
                <div className="App">
                    <div className="App-header">
                        <ReactLoading type={"spin"} color={"white"} height={150} width={150} />
                    </div>
                </div>
            );
        }

        return(
            <div className="App">
                <h1 className="App-title" onClick={() => window.location.href="/home"}>Webbit</h1>
                <div className="App-header">
                    <h2>New Thread</h2>
                    <textarea className={"content-input"} value={this.state.title} onChange={this.handleTitleChange.bind(this)} placeholder="Title" cols="50" rows="1">
                    </textarea>
                    <textarea className={"content-input"} value={this.state.content} onChange={this.handleContentChange.bind(this)} placeholder="Content" cols="50" rows="10">
                    </textarea>
                    <div
                        className="button"
                        onClick={this.publishThread.bind(this)}
                    >
                        Post
                    </div>
                </div>
            </div>
        );
    }
}

export default NewThread;