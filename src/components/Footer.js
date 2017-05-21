import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logoSkyscanner from '../images/PoweredbySkyscanner_Inline_White.png';

export default class Footer extends Component {
  render() {
    return (
          <footer className="container-fluid">
            <div className="row">
              <div className="col-xs-12 text-center">
                <div className="link-footer">Coded with <i className="fa fa-heart text-danger"></i> by <a href="https://github.com/jonathanmartinez/elastic-flight" target="_blank"> Jonathan Martínez </a></div>
                <div className="link-footer left-10 hidden-xs"> |</div>
                <div className="link-footer fix-link-footer"><Link to="/"><img className="logoSkyscanner" src={logoSkyscanner} alt="Powered by Skyscanner"/></Link></div>
              </div>
            </div>
          </footer>
    );
  }
}
