import React, { Component } from 'react';
var LineChart = require("react-chartjs").Line;


export default class FlightsChart extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const data = {
        labels: this.props.xData,
        datasets: [{
            label: 'Price',
            data: this.props.yData,
            borderWidth: 1
        }]
    }

    return (
      <LineChart data={data} width="1600" height="400"/>
    );
  }
}
