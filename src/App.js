import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Results from './Results.js';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <main>
            <Route exact path="/" component={Home}/>
            <Route path="/results/:originPlaceId/:destinationPlaceId/:date/:passengers" component={Results}/>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}
