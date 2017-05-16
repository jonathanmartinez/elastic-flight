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
                    <div className="col-xs-5">
                      <h3><b>{this.props.originPlaceCode}</b></h3>
                      <p>{this.props.originPlaceName}</p>
                    </div>
                    <div className="col-xs-2">
                      <i className="fa fa-long-arrow-right arrow"></i>
                    </div>
                    <div className="col-xs-5">
                      <h3><b>{this.props.destinationPlaceCode}</b></h3>
                      <p>{this.props.destinationPlaceName}</p>
                    </div>
                  </div>
                  <br/>
                  <div className="row">
                    <div className="col-xs-5">
                      <p className="my-label">DATE</p>
                      <p><b>{row.DateStringFormat}</b></p>
                    </div>
                    <div className="col-xs-5 col-xs-offset-2">
                      <p className="my-label">PASSENGERS</p>
                      <p><b>{this.props.passengers}</b></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-xs-12 text-center price-result">
                  <h2><b>{row.MinPriceFormat}</b></h2>
                  <a target="_blank" href="http://skyscanner.com"><button type="button" className="btn form-control btn-ef">Book now!</button></a>
                </div>
              </div>
            );
          }, this)}
      </div>
    );
  }
}
