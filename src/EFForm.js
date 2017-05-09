import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaceInput from './PlaceInput.js';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class EFForm extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    label: React.PropTypes.string,
    searchable: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
    const d = new Date();
    this.state = {
      month: {value:("0" + (d.getMonth() + 2)).slice(-2), label: "Next month"}, //Current month in 2-digit format
      year: {value: d.getFullYear(), label:d.getFullYear()},
      passengers: 1,
      originPlace: {PlaceId: "", PlaceName: "Country, city or airport..."},
      destinationPlace: {PlaceId: "", PlaceName: "Country, city or airport..."},
      formValidationStarted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handlePassengersChange = this.handlePassengersChange.bind(this);
    this.handleOriginPlaceChange = this.handleOriginPlaceChange.bind(this);
    this.handleDestinationPlaceChange = this.handleDestinationPlaceChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateYear = this.updateYear.bind(this);
  }

  getDefaultProps () {
		return {
			label: 'States:',
			searchable: true,
		};
	}
	getInitialState () {
		return {
			country: 'AU',
			disabled: false,
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true,
		};
}
updateValue (newValue) {
		this.setState({
			month: newValue
		});
}

updateYear (newValue) {
		this.setState({
			year: newValue
		});
}

  handleSubmit(event) {
      event.preventDefault();
      if(!this.state.originPlace.PlaceId){
          this.setState({formValidationStarted: true});
          return false;
      }
      if(!this.state.destinationPlace.PlaceId){
          this.setState({formValidationStarted: true});
          return false;
      }
      this.context.router.history.push(`/results/${this.state.originPlace.PlaceId}/${this.state.destinationPlace.PlaceId}/${this.state.year.value}-${this.state.month.value}/${this.state.passengers}`);
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
    var options = [
      {value:'01', label: 'Janaury'},
      {value:'02', label: 'February'},
      {value:'03', label: 'March'},
      {value:'04', label: 'April'},
      {value:'05', label: 'May'},
      {value:'06', label: 'June'},
      {value:'07', label: 'July'},
      {value:'08', label: 'August'},
      {value:'09', label: 'September'},
      {value:'10', label: 'October'},
      {value:'11', label: 'November'},
      {value:'12', label: 'December'},
    ]

    var years = [
      {value:'2017', label: '2017'},
      {value:'2018', label: '2018'},
      {value:'2019', label: '2019'},
    ]

    return (
      <form onSubmit={this.handleSubmit} className="row">
        <div className="form-group col-xs-12 col-md-3">
          <label>Origin</label>
          <PlaceInput place={originPlace} autofocus={true} onPlaceChange={this.handleOriginPlaceChange} className="form-control" />
          {
              !this.state.originPlace.PlaceId && this.state.formValidationStarted ?
              <span className="helpBlock text-danger"><i className="fa fa-times"></i> Origin is required</span>
              :
              null
          }
        </div>
        <div className="form-group col-xs-12 col-md-3">
          <label>Destination</label>
          <PlaceInput place={destinationPlace} onPlaceChange={this.handleDestinationPlaceChange} className="form-control" />
          {
              !this.state.destinationPlace.PlaceId && this.state.formValidationStarted ?
              <span className="helpBlock text-danger"><i className="fa fa-times"></i> Destination is required</span>
              :
              null
          }
        </div>
        <div className="form-group col-xs-12 col-md-2">
          <label>Month</label>
          <Select options={options} clearable={false} value={this.state.month} onChange={this.updateValue} />
        </div>
        <div className="form-group col-xs-6 col-md-1">
          <label>Year</label>
          <Select options={years} value={this.state.year} clearable={false} onChange={this.updateYear} />
        </div>
        <div className="form-group col-xs-6 col-md-1">
          <label>Passengers</label>
          <input type="number" min="1" value={this.state.passengers} onChange={this.handlePassengersChange} className="form-control" />
        </div>

        <div className="form-group col-xs-12 col-md-2">
          <label>&nbsp;</label>
          <button type="submit" className="btn form-control btn-ef">Search</button>
        </div>

      </form>
    );
  }
}
