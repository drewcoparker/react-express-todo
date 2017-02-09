import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from '../node_modules/jquery/dist/jquery.min.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theClass: []
        }
        this.addStudent = this.addStudent.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        $.getJSON('http://localhost:3001/getStudents', (studentsFromAPI) => {
            // console.log(studentsFromAPI);
            this.setState({
                theClass: studentsFromAPI
            })
        })
    }

    addStudent(event) {
        var self = this;
        var studentToAdd = event.target.parentNode.childNodes[0].value;
        $.ajax({
            method: "POST",
            url: "http://localhost:3001/addStudent",
            data: { name: studentToAdd }
        })
        .done(function( studentsArray ) {
            self.setState({
                theClass: studentsArray
            })
        });
    }

    render() {
        var theClassArray = [];
        this.state.theClass.map((student, index) => {
            theClassArray.push(<li key={index}>{student.name}</li>);
        })

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <div>
                    <input type="text" id="newStudent"></input>
                    <button onClick={this.addStudent}>Add Student</button>
                </div>

                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <ul>
                    {theClassArray}
                </ul>
            </div>
        );
    }
}

export default App;
