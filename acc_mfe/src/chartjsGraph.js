import React from 'react';
import {Line, Chart} from 'react-chartjs-2';
import 'chartjs-plugin-streaming';


const initialOptions = {
    scales: {
      xAxes: [{
        type: 'realtime',
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
    },
    tooltips: {enabled: false},
    hover: {mode: null}
};

class ChartjsGraph extends React.Component {
    constructor (props) {
        super()
        this.state = {
            graphOptions: initialOptions
        }

        this.handleAxisTypeToggle = this.handleAxisTypeToggle.bind(this);
    }

    handleAxisTypeToggle () {
        var newStateOptions = this.state.graphOptions
        newStateOptions.scales.yAxes[0].type = newStateOptions.scales.yAxes[0].type == "linear" ? "logarithmic" : "linear"
        this.setState({graphOptions: newStateOptions})
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
}

export default ChartjsGraph