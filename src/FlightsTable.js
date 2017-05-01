import React, { Component } from 'react';

export default class FlightsTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const sortedFlights = this.props.flights.sort(function(a,b) {return (a.MinPrice > b.MinPrice) ? 1 : ((b.MinPrice > a.MinPrice) ? -1 : 0);});
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Passengers</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sortedFlights.map(function(row, i) {
            return (
              <tr key={i}>
                <td>{this.props.originPlaceName}</td>
                <td>{this.props.destinationPlaceName}</td>
                <td>{row.DateStringFormat}</td>
                <td>{this.props.passengers}</td>
                <td>{row.MinPriceFormat}</td>
              </tr>
            );
          }, this)}
        </tbody>
      </table>
    );
  }
}
