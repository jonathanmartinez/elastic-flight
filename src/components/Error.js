import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Error extends Component {
  render() {
    return (
      <div className="container container-loading">
        <div className="row">
          <div className="col-xs-12 text-center error">
            <i className="fa fa-frown-o"></i>
            <p className="lead">Sorry, we do not find any flight for your filters, choose another filters.</p>
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <Link to="/"><button type="button" className="btn btn-default btn-ef btn-block rounded">Change filters</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
