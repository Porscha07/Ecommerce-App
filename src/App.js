import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Students from './Students';
import Home from './Containers/Home';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Students />
      </div>
    );
  }
}

export default App;

