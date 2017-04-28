import React, { Component } from 'react';
import EFForm from './EFForm.js';

export default class Home extends Component {
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
            <h1>Elastic Flight</h1>
            <blockquote>
              <p>Elastic Flight — Find cheap flights with no particular date.</p>
            </blockquote>
            <EFForm/>
            </div>
          </div>
        </div>
    );
  }
}
