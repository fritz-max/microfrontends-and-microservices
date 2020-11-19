import React from 'react';
import {Line, Chart} from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import 'chartjs-plugin-streaming';

import Connection from './wamp';
import ConnectionSettings from "./ConnectionSettings";


const initialState = {
  datasets: [
    {
      label: "Mock Data",
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,1^^92,1)',
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
        duration: 1
    }
};


class Graph extends React.Component {
    constructor () {
        super()
        this.state = {
            graphData: initialState,
            graphOptions: initialOptions
        }
        this.wampConnection = new Connection()
        this.connectionSettings = new ConnectionSettings()

        // Function Bindings
        this.handleAxisTypeToggle = this.handleAxisTypeToggle.bind(this);
        this.handlePauseToggle = this.handlePauseToggle.bind(this);
    }

    componentDidMount(){
        this.wampConnection.subscribe(this.connectionSettings.subscribeTopics[0], (args) => {
            var newDataSet = this.state.graphData.datasets[0];
            newDataSet.data = [...newDataSet.data,
                {
                    x: Date.now(),
                    y: args[1]
                }
            ];
            this.setState({graphData: {datasets: [newDataSet]}});
        })
        this.wampConnection.openConnection();
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
    
}

export default Graph