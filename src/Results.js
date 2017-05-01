import React, { Component } from 'react';
import FlightsTable from './FlightsTable.js';
import FlightsChart from './FlightsChart.js';
import { Link } from 'react-router-dom';
import EFForm from './EFForm.js';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      originPlace: {},
      destinationPlace: {},
    };
  }

  componentDidMount(){
    this.fetchFlights();
    //TODO: refact
    this.fetchOriginPlace(this.props.match.params.originPlaceId);
    this.fetchDestinationPlace(this.props.match.params.destinationPlaceId);
  }

  fetchFlights(){
        fetch(`http://localhost:8080/?url=http://partners.api.skyscanner.net/apiservices/browsegrid/v1.0/ES/eur/es-ES/${this.props.match.params.originPlaceId}/${this.props.match.params.destinationPlaceId}/${this.props.match.params.date}?apikey=prtl6749387986743898559646983194`)
            .then((response) => response.json())
            .then((json) => {
              var flightsFormat = [];
              json.Dates[0].forEach(function (value, i) {
                if(json.Dates[1][i]){
                  flightsFormat.push({
                    DateString: value.DateString,
                    DateStringFormat: new Date(value.DateString).toDateString(),
                    MinPrice: json.Dates[1][i] ? json.Dates[1][i].MinPrice * this.props.match.params.passengers : 0,
                    MinPriceFormat: json.Dates[1][i] ? (json.Dates[1][i].MinPrice * this.props.match.params.passengers).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : 0
                  })
                }
              }, this);

              var prices = json.Dates[1].map(p => p ? p.MinPrice : 99999 );

              this.setState({
                 'flights' : flightsFormat,
                 'cheaperFlight' : flightsFormat[prices.indexOf(Math.min(...prices))],//get the cheaper flight based on their price
              });
            });
    }

    //TODO: Refact
    fetchOriginPlace(PlaceId){
          fetch(`http://localhost:8080/?url=http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/ES/eur/es-ES?id=${PlaceId}%26apikey=prtl6749387986743898559646983194`)
              .then((response) => response.json())
              .then((json) => {
                this.setState({
                   originPlace : json.Places[0],
                });
              });
      }
    fetchDestinationPlace(PlaceId){
            fetch(`http://localhost:8080/?url=http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/ES/eur/es-ES?id=${PlaceId}%26apikey=prtl6749387986743898559646983194`)
                .then((response) => response.json())
                .then((json) => {
                  this.setState({
                     destinationPlace : json.Places[0],
                  });
                });
        }

  render() {
      if (this.state.flights.length > 0) {
        const xData =  this.state.flights.map( f => f.DateStringFormat );
        const yData =  this.state.flights.map( f => f.MinPrice );

        return (
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <Link to="/">Change filters</Link>
                <p>The cheaper flight from {this.state.originPlace.PlaceName} to {this.state.destinationPlace.PlaceName} for {this.props.match.params.passengers} passenger(s) is on {this.state.cheaperFlight.DateStringFormat} for {this.state.cheaperFlight.MinPriceFormat}</p>
                <FlightsChart xData={xData} yData={yData}/>
                <FlightsTable
                  flights={this.state.flights}
                  passengers={this.props.match.params.passengers}
                  originPlaceName={`${this.state.originPlace.PlaceName}  — ${this.state.originPlace.CountryName}  (${this.state.originPlace.PlaceId.replace('-sky', '')})`}
                  destinationPlaceName={`${this.state.destinationPlace.PlaceName}  — ${this.state.destinationPlace.CountryName}  (${this.state.destinationPlace.PlaceId.replace('-sky', '')})`}
                />
              </div>
            </div>
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
