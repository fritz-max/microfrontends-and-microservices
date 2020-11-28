import React from 'react';
import {Line, Chart} from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import 'chartjs-plugin-streaming';


const initialOptions = {
    scales: {
      xAxes: [{
        type: 'time',
        realtime: {
            duration: 10000,    // data in the past 20000 ms will be displayed
            refresh: 200,      // onRefresh callback will be called every 1000 ms
            delay: 500,        // delay of 1000 ms, so upcoming values are known before plotting a line
            pause: false,       // chart is not paused
          },
        time: {
            parser: "hh:mm:ss",
            unit: "second",
            stepsize: 5
        }
      }],
      yAxes: [{
          type: 'linear',
          ticks: {
              min: -200,
              max: 200
          }
      }]
    },
    plugins: {
        streaming: {
            frameRate: 30
        }
    },
    animation: {
        duration: 0
    },
    pan: {
        enabled: true,    // Enable panning
        mode: 'xy',        // Allow panning in the x direction
        rangeMin: {
            x: null       // Min value of the delay option
        },
        rangeMax: {
            x: null       // Max value of the delay option
        }
    },
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
    // elements: {
    //     line: {
    //         tension: 0 // disables bezier curves
    //     }
    // }
};

class ChartjsGraph extends React.Component {
    constructor (props) {
        super()
        this.state = {
            graphOptions: initialOptions
        }

        // Function Bindings
        this.handleAxisTypeToggle = this.handleAxisTypeToggle.bind(this);
        this.handlePauseToggle = this.handlePauseToggle.bind(this);
    }

    render() {
        return (
            <div>
            <Line 
                data={this.props.data} 
                options={this.state.graphOptions}
            />
            <button onClick={this.handlePauseToggle}>Pause</button>
            <button onClick={this.handleAxisTypeToggle}>Axis Type</button>
            </div>
        );
    }

    handlePauseToggle () { 
        var newStateOptions = this.state.graphOptions
        console.log(newStateOptions.scales.xAxes[0].realtime.pause)
        newStateOptions.scales.xAxes[0].realtime.pause = !newStateOptions.scales.xAxes[0].realtime.pause
        this.setState({graphOptions: newStateOptions})
    }

    handleAxisTypeToggle () {
        var newStateOptions = this.state.graphOptions
        newStateOptions.scales.yAxes[0].type = newStateOptions.scales.yAxes[0].type == "linear" ? "logarithmic" : "linear"
        this.setState({graphOptions: newStateOptions})
    }
}

export default ChartjsGraph