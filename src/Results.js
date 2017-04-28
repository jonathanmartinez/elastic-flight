import React, { Component } from 'react';
import FlightsTable from './FlightsTable.js';
import FlightsChart from './FlightsChart.js';
import { Link } from 'react-router-dom';
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
                    DateStringFormat: new Date(value.DateString).toDateString(),
                    MinPrice: responseJson.Dates[1][i] ? responseJson.Dates[1][i].MinPrice : 0,
                    MinPriceFormat: responseJson.Dates[1][i] ? responseJson.Dates[1][i].MinPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : 0
                  })
              });
              this.setState({
                 'flights' : flightsFormat,
              });
            });
    }

  render() {
      if (this.state.flights.length > 0) {
        const xData =  this.state.flights.map( f => f.DateStringFormat );
        const yData =  this.state.flights.map( f => f.MinPrice );

        return (
          <div>
            <Link to="/">Change filters</Link>
            <p>{this.props.match.params.originPlaceId}</p>
            <p>{this.props.match.params.destinationPlaceId}</p>
            <p>{this.props.match.params.date}</p>
            <FlightsChart xData={xData} yData={yData}/>
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
