import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./Login";
import Settings from "./Settings";
import './App.css';
import { throws } from "assert";
import { runInThisContext } from "vm";
import firebase from "firebase";



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
        return(
            <div>
                <form className="form">
                    <label>
                        <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} placeholder="Title"/>
                    </label>
                    <br/>
                    <label>
                        <input type="text" value={this.state.content} onChange={this.handleContentChange.bind(this)} placeholder="Content"/>
                    </label>
                </form>
                <div
                    className="button"
                    onClick={this.publishThread.bind(this)}
                >
                    Yeet
                </div>
            </div>
        );
    }
}

export default NewThread;