import React from 'react';
import {Line, Chart} from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import 'chartjs-plugin-streaming';

import autobahn from 'autobahn-browser';


const initialState = {
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

const initialOptions = {
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
            duration: 20000,    // data in the past 20000 ms will be displayed
            refresh: 1000,      // onRefresh callback will be called every 1000 ms
            delay: 1000,        // delay of 1000 ms, so upcoming values are known before plotting a line
            pause: false,       // chart is not paused
            ttl: undefined,     // data will be automatically deleted as it disappears off the chart
            // onRefresh: function(chart) {
            //   chart.data.datasets.forEach(function(dataset) {
            //     dataset.data.push({
            //       x: Date.now(),
            //       y: Math.random()
            //     });
            //   });
            // },
          }
      }],
      yAxes: [{
          type: 'linear'
      }]
    },
    plugins: {
        streaming: {
            frameRate: 30
        }
    },
    animation: {
        duration: 0
    }
    // // Assume x axis is the realtime scale
    // pan: {
    //     enabled: true,    // Enable panning
    //     mode: 'x',        // Allow panning in the x direction
    //     rangeMin: {
    //         x: null       // Min value of the delay option
    //     },
    //     rangeMax: {
    //         x: null       // Max value of the delay option
    //     }
    // },
    // zoom: {
    //     enabled: true,    // Enable zooming
    //     mode: 'x',        // Allow zooming in the x direction
    //     rangeMin: {
    //         x: null       // Min value of the duration option
    //     },
    //     rangeMax: {
    //         x: null       // Max value of the duration option
    //     }
    // }
};

class Graph extends React.Component {
    constructor () {
        super()
        this.state = {
            graphData: initialState,
            graphOptions: initialOptions
        }
        this.handleAxisTypeToggle = this.handleAxisTypeToggle.bind(this);
        this.handlePauseToggle = this.handlePauseToggle.bind(this);
    }


    handlePauseToggle () {
        var newStateOptions = this.state.graphOptions
        newStateOptions.scales.xAxes[0].realtime.pause = !newStateOptions.scales.xAxes[0].realtime.pause
        this.setState({graphOptions: newStateOptions})
        }

    handleAxisTypeToggle () {
        var newStateOptions = this.state.graphOptions
        newStateOptions.scales.yAxes[0].type = newStateOptions.scales.yAxes[0].type == "linear" ? "logarithmic" : "linear"
        this.setState({graphOptions: newStateOptions})
    }
    
	componentDidMount(){
        
        this.autobahnConnection = new autobahn.Connection({
            url: 'ws://localhost:8080/ws',
            realm: 'realm1'
        })

        this.autobahnConnection.onopen = (session, details) => {
            session.subscribe("com.myapp.hello", (args) => {
                // console.log('Received Message: ', args[0])

                var oldDataSet = this.state.graphData.datasets[0];
                var newDataSet = {
                    ...oldDataSet
                };
                
                var newData = [...newDataSet.data, 
                    {
                        x: Date.now(),
                        y: args[1]
                    }
                ];        
                newDataSet.data = newData;

                var newState = {
                    datasets: [newDataSet]
                };

                this.setState({graphData: newState});
                
            });
        }

        this.autobahnConnection.open();

    }

    componentWillUnmount() {
        this.autobahnConnection.close();
    }

	render() {
		return (
            <div>
			<Line data={this.state.graphData} options={this.state.graphOptions}/>
            <button onClick={this.handlePauseToggle}>Pause</button>
            <button onClick={this.handleAxisTypeToggle}>Axis Type</button>
            </div>
		);
	}
}

export default Graph