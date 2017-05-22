import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Results from './Results.jsx';

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
