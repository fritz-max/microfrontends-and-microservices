import React from "react";
import ChartjsGraph from './chartjsGraph';
import { Wamp, ConnectionSettings } from './Connection';

class Service extends React.Component {
  constructor() {
    super()
    this.wamp = new Wamp()
    this.connectionSettings = new ConnectionSettings()
    
    // Service state handles datasets, that will be passed down to chart component in render function
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
      }
    };
    
    // React specific function bindings
    this.updatePlotData = this.updatePlotData.bind(this)
    this.handleACCControl = this.handleACCControl.bind(this)
  }

  componentDidMount() {
    // Register this services update Function to wamp subscription
    this.wamp.subscribe(this.connectionSettings.subscribeTopics["ACC"], (args) => {
      this.updatePlotData(args)
    })
    this.wamp.openConnection();
  }

  componentWillUnmount() {
    this.wamp.closeConnection();
  }

  updatePlotData(args) {
    // Updating the state of the service component with new data
    var newChartjsDatasets = []
    var timestamp = new Date()
    
    this.state.chartjsData.datasets.forEach((dataset, idx) => {
      dataset.data.push({
        t: timestamp,
        y: args[1][idx]
      })
      newChartjsDatasets.push(dataset)
    })

    this.setState({chartjsData: {datasets: newChartjsDatasets}});
  }

  handleACCControl() {
    this.wamp.callRPC(this.connectionSettings.callerTopics["ACC/control_measurement"])
  }

  render() {
    return (
      <div style={
        {backgroundColor: "WhiteSmoke", textAlign: "center"}
      }>
        <h1>Microfrontend</h1>
        <div style={{width: "750px"}}>
          <ChartjsGraph 
            data={this.state.chartjsData}
          />
        </div>
        <button onClick={this.handleACCControl}>[RPC] ACC Control</button>
      </div>
    );
  }
}

export default Service;