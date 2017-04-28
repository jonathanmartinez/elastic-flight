import React, { Component } from 'react';

export default class FlightsTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table >
        <thead>
          <tr>
            <th>Date</th><th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.flights.map(function(row, i) {
            return (
              <tr key={i}>
                <td>{row.DateString}</td>
                <td>{row.MinPrice}</td>
              </tr>
            );
          }, this)}
        </tbody>
      </table>
    );
  }
}
