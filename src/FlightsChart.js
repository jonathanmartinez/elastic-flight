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
    const options = {
      responsive: true,
      scaleLabel: function(label){
        return parseInt(label.value).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
      },
      tooltipTemplate: function(tooltip){
        return tooltip.label + ': ' + parseInt(tooltip.value).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
      }
    }

    return (
      <LineChart data={data} options={options}/>
    );
  }
}
