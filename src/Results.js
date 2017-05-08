import React, { Component } from 'react';
import FlightsTable from './FlightsTable.js';
import FlightsChart from './FlightsChart.js';
import { Link } from 'react-router-dom';
import EFForm from './EFForm.js';
import 'font-awesome/css/font-awesome.css';

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

              var prices = flightsFormat.map(f => f.MinPrice);

              this.setState({
                 'flights' : flightsFormat,
                 'cheapestFlight' : flightsFormat[prices.indexOf(Math.min(...prices))],//get the cheaper flight based on their price
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
        const xData =  this.state.flights.map( f => f.DateStringFormat.slice(0, f.DateStringFormat.length - 4) );//remove the year
        const yData =  this.state.flights.map( f => f.MinPrice );

        return (
          <div className="container results">


            <div className="row results-info">
              <div className="col-xs-10">
                <Link to="/"><i className="fa fa-angle-left"></i> Change filters</Link>
              </div>
              <div className="col-xs-2 text-right">
                <button className="btn btn-default"><i className="fa fa-share-alt"></i></button>
              </div>
            </div>



            <section className="row">
              <div className="col-xs-12 text-center">
                <h3 className="">The cheapest flight from {this.state.originPlace.PlaceName} to {this.state.destinationPlace.PlaceName} for {this.props.match.params.passengers} passenger(s) is on {this.state.cheapestFlight.DateStringFormat} for <b>{this.state.cheapestFlight.MinPriceFormat}</b></h3>
                <br/>
                <div className="row">
                  <div className="col-xs-12 col-md-3 col-md-offset-3">
                    <button type="button" className="btn btn-block btn-ef">Book now!</button>
                  </div>
                  <div className="col-xs-12 col-md-3">
                    <button type="button" className="btn btn-default btn-block rounded">See more options</button>
                  </div>
                </div>
                <br/>
                <div className="chartDiv">
                  <FlightsChart xData={xData} yData={yData}/>
                </div>
              </div>
            </section>

            <section className="row">
              <div className="col-xs-12 text-center">
                <p className="lead">The cheapest flight from {this.state.originPlace.PlaceName} to {this.state.destinationPlace.PlaceName} for {this.props.match.params.passengers} passenger(s) is on <br/> {this.state.cheapestFlight.DateStringFormat} for <b>{this.state.cheapestFlight.MinPriceFormat}</b></p>
                <div className="row">
                  <div className="col-xs-12 col-md-3 col-md-offset-3">
                    <button type="button" className="btn btn-block btn-ef">Book now!</button>
                  </div>
                  <div className="col-xs-12 col-md-3">
                    <button type="button" className="btn btn-default btn-block rounded">See more options</button>
                  </div>
                </div>

              </div>
            </section>

            <section className="row">
              <div className="col-xs-12">
                <p className="my-label lead">MONTHLY RESULTS</p>
                <p>Lorem ipsum dolor average month progress.</p>
                <FlightsTable
                  flights={this.state.flights}
                  passengers={this.props.match.params.passengers}
                  originPlaceName={`${this.state.originPlace.PlaceName}  — ${this.state.originPlace.CountryName}  (${this.state.originPlace.PlaceId.replace('-sky', '')})`}
                  destinationPlaceName={`${this.state.destinationPlace.PlaceName}  — ${this.state.destinationPlace.CountryName}  (${this.state.destinationPlace.PlaceId.replace('-sky', '')})`}
                  originPlaceCode={this.state.originPlace.PlaceId.replace('-sky', '')}
                  destinationPlaceCode={this.state.destinationPlace.PlaceId.replace('-sky', '')}
                />
              </div>
            </section>

          </div>
        );
      }
      else{
        return (
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  <div className="loader">Loading...</div>
                </div>
              </div>

            </div>

        );
      }
  }
}
