import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logoEF from './logo.png';

export default class Navbar extends Component {
  render() {
    return (
          <nav className="container-fluid my-nav">
            <div className="row">
              <div className="col-xs-12 divLogo">
                  <Link to="/"><img height="60" src={logoEF} /></Link>
              </div>
            </div>
          </nav>
    );
  }
}
