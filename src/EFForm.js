import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaceInput from './PlaceInput.js';

export default class EFForm extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props);
    const d = new Date();
    this.state = {
      month: ("0" + (d.getMonth() + 2)).slice(-2), //Current month in 2-digit format
      year: d.getFullYear(),
      passengers: 1,
      originPlace: {PlaceId: "", PlaceName: "Country, city or airport..."},
      destinationPlace: {PlaceId: "", PlaceName: "Country, city or airport..."},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handlePassengersChange = this.handlePassengersChange.bind(this);
    this.handleOriginPlaceChange = this.handleOriginPlaceChange.bind(this);
    this.handleDestinationPlaceChange = this.handleDestinationPlaceChange.bind(this);
  }

  handleSubmit(event) {
    this.context.router.history.push(`/results/${this.state.originPlace.PlaceId}/${this.state.destinationPlace.PlaceId}/${this.state.year}-${this.state.month}/${this.state.passengers}`)
    event.preventDefault();
  }

  handleMonthChange(event) {
    this.setState({month: event.target.value});
  }

  handleYearChange(event) {
    this.setState({year: event.target.value});
  }

  handlePassengersChange(event) {
    this.setState({passengers: event.target.value});
  }

  handleOriginPlaceChange(value) {
    this.setState({originPlace: value});
  }

  handleDestinationPlaceChange(value) {
    this.setState({destinationPlace: value});
  }

  render() {
    const originPlace = this.state.originPlace;
    const destinationPlace = this.state.destinationPlace;

    return (
      <form onSubmit={this.handleSubmit} className="row">
        <div className="form-group col-xs-12 col-md-3">
          <label>Origin</label>
          <PlaceInput place={originPlace} onPlaceChange={this.handleOriginPlaceChange} className="form-control" />
        </div>
        <div className="form-group col-xs-12 col-md-3">
          <label>Destination</label>
          <PlaceInput place={destinationPlace} onPlaceChange={this.handleDestinationPlaceChange} className="form-control" />
        </div>
        <div className="form-group col-xs-6 col-md-2">
          <label>Month</label>
          <select value={this.state.month} onChange={this.handleMonthChange} className="form-control">
            <option value='01'>Janaury</option>
            <option value='02'>February</option>
            <option value='03'>March</option>
            <option value='04'>April</option>
            <option value='05'>May</option>
            <option value='06'>June</option>
            <option value='07'>July</option>
            <option value='08'>August</option>
            <option value='09'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </div>
        <div className="form-group col-xs-6 col-md-1">
          <label>Year</label>
          <select value={this.state.year} onChange={this.handleYearChange} className="form-control">
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
          </select>
        </div>
        <div className="form-group col-xs-12 col-md-1">
          <label>Passengers</label>
          <input type="number" min="1" value={this.state.passengers} onChange={this.handlePassengersChange} className="form-control" />
        </div>

        <div className="form-group col-xs-12 col-md-2">
          <label>&nbsp;</label>
          <button type="submit" className="btn form-control btn-ef">Search</button>
        </div>

      </form>

      /*<form onSubmit={this.handleSubmit}>
        <label>
          Origin:
          <PlaceInput place={originPlace} onPlaceChange={this.handleOriginPlaceChange} />
        </label>
        <label>
          Destination:
          <PlaceInput place={destinationPlace} onPlaceChange={this.handleDestinationPlaceChange} />
        </label>
        <label>
          Month:
          <select value={this.state.month} onChange={this.handleMonthChange}>
            <option value='01'>Janaury</option>
            <option value='02'>February</option>
            <option value='03'>March</option>
            <option value='04'>April</option>
            <option value='05'>May</option>
            <option value='06'>June</option>
            <option value='07'>July</option>
            <option value='08'>August</option>
            <option value='09'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </label>
        <label>
          Year:
          <select value={this.state.year} onChange={this.handleYearChange}>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>*/
    );
  }
}
