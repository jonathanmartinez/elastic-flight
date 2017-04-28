import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home.js';
import Results from './Results.js';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/results">Results</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/results/:originPlaceId/:destinationPlaceId/:date" component={Results}/>
        </div>
      </Router>
    );
  }
}
