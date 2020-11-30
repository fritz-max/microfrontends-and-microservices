import React from "react";
import ChartjsGraph from './graphs/chartjsGraph';
import PlotlyGraph from "./graphs/plotlyGraph";
import { Wamp, ConnectionSettings } from './Connection';

class Service extends React.Component {
  constructor() {
    super()
    this.wamp = new Wamp()
    this.connectionSettings = new ConnectionSettings()
    
    this.state = {
      chartjsData: {
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
      },
      plotlyData: [
          {
              x: [],
              y: [],
              type: 'scattergl',
              name: 'data1',
              mode: 'lines+markers'
          },
          {
              x: [],
              y: [],
              type: 'scattergl',
              name: 'data2',
              mode: 'lines+markers'
          },
          {
              x: [],
              y: [],
              type: 'scattergl',
              name: 'data3',
              mode: 'lines+markers'
          }
      ]
  };
    
    this.updatePlotData = this.updatePlotData.bind(this)
    this.handleIMUControlButton = this.handleIMUControlButton.bind(this)
  }

  componentDidMount() {
    this.wamp.subscribe(this.connectionSettings.subscribeTopics["IMU"], (args) => {
      this.updatePlotData(args)
    })
    this.wamp.openConnection();
  }

  componentWillUnmount() {
    this.wamp.closeConnection();
  }

  updatePlotData(args) {
    var newPlotlyData = []
    var newChartjsDatasets = []
    var timestamp = new Date()
    
    this.state.plotlyData.forEach((dataset, idx) => {
      dataset.x.push(timestamp)
      dataset.y.push(args[1][idx])
      newPlotlyData.push(dataset)
    })
    
    this.state.chartjsData.datasets.forEach((dataset, idx) => {
      dataset.data.push({
        x: timestamp,
        y: args[1][idx]
      })
      newChartjsDatasets.push(dataset)
    })

    this.setState({
      chartjsData: {datasets: newChartjsDatasets},
      plotlyData: newPlotlyData
    });
  }

  handleIMUControlButton() {
    console.log("RPC Function Call")
    this.wamp.connection.session.call(this.connectionSettings.callerTopics["IMU/control_measurement"]).then(returnValue => {
      this.wamp.connection.session.log("RPC Called. Returned: ", returnValue);
    });
  }

  render() {
    return (
      <div style={
        {backgroundColor: "WhiteSmoke", textAlign: "center"}
      }>
        <h1>Microfrontend</h1>
        <div style={{width: "750px", justifyContent: "center"}}>
          <ChartjsGraph 
            data={this.state.chartjsData}
          />
        </div>
          <PlotlyGraph  
            data={this.state.plotlyData}
          />
          <p></p>
        <button onClick={this.handleIMUControlButton}>[RPC] IMU Control</button>
      </div>
    );
  }
}

export default Service;
