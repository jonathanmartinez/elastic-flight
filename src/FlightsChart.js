import React, { Component } from 'react';
//var LineChart = require("react-chartjs").Line;
import Chart from 'chart.js';


export default class FlightsChart extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    const ctx = this.refs.chart.getContext('2d');
    const x = this.props.xData
    const y = this.props.yData
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(65,207,212,0.5)');
    gradient.addColorStop(1, 'rgba(146,125,243,0.5)');
    const data = {
      labels: x,
      datasets: [
        {
          fillColor: gradient,
          strokeColor : "#40D0D4",//"#40D0D4",//#927DF3",
          data: y,
        },
      ],
    };
    const options = {
      pointHitDetectionRadius : 10,
      maintainAspectRatio: false,
      //scaleShowVerticalLines: false,
      //scaleShowHorizontalLines: false,
      backgroundColor: "#F5DEB3",
      //responsive: true,
      scaleLabel: function(label){
        return parseInt(label.value).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
      },
      tooltipTemplate: function(tooltip){
        return tooltip.label + ': ' + parseInt(tooltip.value).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
      },
    };
    /* eslint new-cap: ["error", {"capIsNewExceptions": ["Line"]}] */
    const myLineChart = new Chart(ctx).Line(data, options);
  }
  render() {
    /*var ctx = document.getElementById("chart").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);

    gradient.addColorStop(0, 'rgba(146,125,243,1)');
    gradient.addColorStop(1, 'rgba(65,207,212,1)');

    const data = {
        labels: this.props.xData,
        datasets: [{
            label: 'Price',
            fillColor : gradient,
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
    }*/

    return (
      //<LineChart data={data} options={options}/>
      <canvas className="chart" ref="chart" width="1024" height="400" />
    );
  }
}
