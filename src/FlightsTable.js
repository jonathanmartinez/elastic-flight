import React, { Component } from 'react';

export default class FlightsTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date</th><th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.flights.map(function(row, i) {
            return (
              <tr key={i}>
                <td>{row.DateStringFormat}</td>
                <td>{row.MinPriceFormat}</td>
              </tr>
            );
          }, this)}
        </tbody>
      </table>
    );
  }
}
