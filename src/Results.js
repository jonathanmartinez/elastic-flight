import React, { Component } from 'react';
import FlightsTable from './FlightsTable.js';
import EFForm from './EFForm.js';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
  }

  componentDidMount(){
    this.fetchFlights();
  }

  fetchFlights(){
        fetch(`http://localhost:8080/?url=http://partners.api.skyscanner.net/apiservices/browsegrid/v1.0/ES/eur/es-ES/${this.props.match.params.originPlaceId}/${this.props.match.params.destinationPlaceId}/${this.props.match.params.date}?apikey=prtl6749387986743898559646983194`)
            .then((response) => response.json())
            .then((responseJson) => {
              var flightsFormat = [];
              responseJson.Dates[0].forEach(function (value, i) {
                  flightsFormat.push({
                    DateString: value.DateString,
                    MinPrice: responseJson.Dates[1][i] ? responseJson.Dates[1][i].MinPrice : 'Not available'})
              });
              this.setState({
                 'flights' : flightsFormat,
              });
            });
    }

  render() {
      if (this.state.flights.length > 0) {
        return (
          <div>
            <p>{this.props.match.params.originPlaceId}</p>
            <p>{this.props.match.params.destinationPlaceId}</p>
            <p>{this.props.match.params.date}</p>
            <FlightsTable flights={this.state.flights} />
          </div>
        );
      }
      else{
        return (
          <h1>
            <p>Cargando...</p>
          </h1>
        );
      }
  }
}
