import React from 'react';
import {Line, Chart} from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import 'chartjs-plugin-streaming';

import Wamp from '../connection/Wamp';
import ConnectionSettings from "../connection/connectionSettings";


const initialState = {
  datasets: [
    {
        label: "Data0",
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(108,108,248,1)',
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
    },
    {
        label: "Data1",
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(248,108,108,1)',
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
    },
    {
        label: "Data2",
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(108,248,108,1)',
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
    }
  ]
};

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
            graphData: initialState,
            graphOptions: initialOptions
        }
        this.wamp = new Wamp()
        this.connectionSettings = new ConnectionSettings()

        // Function Bindings
        this.handleAxisTypeToggle = this.handleAxisTypeToggle.bind(this);
        this.handlePauseToggle = this.handlePauseToggle.bind(this);
        this.handleRemotePause = this.handleRemotePause.bind(this);
    }

    componentDidMount(){
        this.wamp.subscribe(this.connectionSettings.subscribeTopics[0], (args) => {
            var newDataSet0 = this.state.graphData.datasets[0];
            var newDataSet1 = this.state.graphData.datasets[1];
            var newDataSet2 = this.state.graphData.datasets[2];
            var timestamp = new Date();
            newDataSet0.data = [...newDataSet0.data, {
                    t: timestamp,
                    y: args[1][0]
                }];
            newDataSet1.data = [...newDataSet1.data, {
                    t: timestamp,
                    y: args[1][1]
                }];
            newDataSet2.data = [...newDataSet2.data, {
                    t: timestamp,
                    y: args[1][2]
                }];
            this.setState({graphData: {datasets: [newDataSet0, newDataSet1, newDataSet2]}});
        })
        this.wamp.openConnection();
    }

    render() {
        return (
            <div>
            <Line 
                data={this.state.graphData} 
                options={this.state.graphOptions}
            />
            <button onClick={this.handlePauseToggle}>Pause</button>
            <button onClick={this.handleAxisTypeToggle}>Axis Type</button>
            <button onClick={this.handleRemotePause}>Remote Pause</button>
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
    
    handleRemotePause () {
        this.wamp.connection.session.call(this.connectionSettings.rpcTopics[0]).then(returnValue => {
            this.wamp.connection.session.log("RPC Called. Returned: ", returnValue);
        });
    }
}

export default ChartjsGraph