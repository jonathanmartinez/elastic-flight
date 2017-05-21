import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="container container-loading">
        <div className="row">
          <div className="col-xs-12">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }
}
