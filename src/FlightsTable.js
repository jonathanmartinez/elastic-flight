import React, { Component } from 'react';

export default class FlightsTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const sortedFlights = this.props.flights.sort(function(a,b) {return (a.MinPrice > b.MinPrice) ? 1 : ((b.MinPrice > a.MinPrice) ? -1 : 0);});
    return (
      <div>
          {sortedFlights.map(function(row, i) {
            return (
              <div className="row well-ticket" key={i}>
                <div className="col-md-8 col-xs-12">
                  <div className="row">
                    <div className="col-xs-6">
                      <h3>{this.props.originPlaceCode}</h3>
                      <p>{this.props.originPlaceName}</p>
                    </div>
                    <div className="col-xs-6">
                      <h3>{this.props.destinationPlaceCode}</h3>
                      <p>{this.props.destinationPlaceName}</p>
                    </div>
                  </div>
                  <br/>
                  <div className="row">
                    <div className="col-xs-6">
                      <p className="my-label">DATE</p>
                      <p><b>{row.DateStringFormat}</b></p>
                    </div>
                    <div className="col-xs-6">
                      <p className="my-label">PASSENGERS</p>
                      <p><b>{this.props.passengers}</b></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-xs-12 text-center price-result">
                  <h1>{row.MinPriceFormat}</h1>
                  <button type="button" className="btn form-control btn-ef">Book now!</button>
                </div>
              </div>
            );
          }, this)}
      </div>
    );
  }
}
