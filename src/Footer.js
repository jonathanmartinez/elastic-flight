import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logoSkyscanner from './PoweredbySkyscanner_Inline_White.png';

export default class Footer extends Component {
  render() {
    return (
          <footer className="container-fluid">
            <div className="row">
              <div className="col-xs-12 text-center">
                <div className="link-footer">Coded with {'<'}3 by Jonathan Martínez </div>
                <div className="link-footer left-10"> |</div>
                <div className="link-footer fix-link-footer"><Link to="/"><img className="logoSkyscanner" src={logoSkyscanner} /></Link></div>
              </div>
            </div>
          </footer>
    );
  }
}
