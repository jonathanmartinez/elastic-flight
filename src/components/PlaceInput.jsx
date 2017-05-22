import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

//Input component that loads places remotely through the Skyscanner API
export default class PlaceInput extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
  }

  static contextTypes = {
    label: React.PropTypes.string,
  }

  getInitialState () {
    return {
      backspaceRemoves: true,
      multi: true
    };
  }

  onChange (value) {
    this.props.onPlaceChange(value);
  }

  getPlaces (input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }
    return fetch(`https://cors-anywhere.herokuapp.com/http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/UK/EUR/en-EN/?query=${input}&apiKey=jo976848726052725135841379967755`)
    .then((response) => response.json())
    .then((json) => {
      json.Places.forEach(function (place, i) {
        place.PlaceName += ` — ${place.CountryName}  (${place.PlaceId.replace('-sky', '')})`;
      });

      return { options: json.Places };
    });
  }

  render () {
    const AsyncComponent = Select.Async;
    const place = this.props.place;

    return(
      <AsyncComponent
        value={place}
        onChange={this.onChange}
        valueKey="PlaceId"
        labelKey="PlaceName"
        loadOptions={this.getPlaces}
        autofocus={this.props.autofocus}
      />
    )
  }
}