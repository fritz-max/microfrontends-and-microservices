import React from "react";
import ChartjsGraph from './graphs/chartjsGraph';
import PlotlyGraph from "./graphs/plotlyGraph";

import Wamp from './connection/Wamp';
import ConnectionSettings from "./connection/connectionSettings";

var traceProto = {
  x: [0],
  y: [0],
  type: 'line'
};

class Service extends React.Component {
  constructor() {
    super()
    this.wamp = new Wamp()
    this.connectionSettings = new ConnectionSettings()
    
    this.state = {
      data: [
          {
              x: [],
              y: [],
              type: 'scatter',
              name: 'data1'
          },
          {
              x: [],
              y: [],
              type: 'scatter',
              name: 'data2'
          },
          {
              x: [],
              y: [],
              type: 'scatter',
              name: 'data3'
          }
      ], 
      layout: {
          showlegend: true,
          datarevision: 0,
          xaxis: {
            autorange: false,
            type: "date"
          }
      }, 
      config: {
          scrollZoom: true
      }
  };
    
    this.updatePlotlyGraph = this.updatePlotlyGraph.bind(this)
    this.handleIMUControl = this.handleIMUControl.bind(this)
  }

  componentDidMount() {
    this.wamp.subscribe(this.connectionSettings.subscribeTopics[0], (args) => {
      this.updatePlotlyGraph(args)
    })
    this.wamp.openConnection();
  }

  componentWillUnmount() {
    this.wamp.closeConnection();
  }

  updatePlotlyGraph(args) {
    var newData = []
    var timestamp = new Date()
    
    this.state.data.forEach((dataset, idx) => {
      dataset.x.push(timestamp)
      dataset.y.push(args[1][idx])
      newData.push(dataset)
    })
    
    this.setState({data: newData});
    
    var layout = this.state.layout
    
    var olderTime = newData[0].x[(newData[0].x.length <= 50) ? 0 : newData[0].x.length-100]
    var futureTime = newData[0].x[newData[0].x.length-1]

    layout.xaxis.range = [ olderTime, futureTime ]

    layout.datarevision = layout.datarevision+1 
    this.setState({layout})
  }

  handleIMUControl() {
    this.wamp.connection.session.call(this.connectionSettings.rpcTopics[0]).then(returnValue => {
      this.wamp.connection.session.log("RPC Called. Returned: ", returnValue);
  });
  }

  render() {
    return (
      <div style={
        {backgroundColor: "WhiteSmoke", textAlign: "center"}
      }>
        <h1>Microfrontend</h1>
        {/* <div style={{width: "750px"}}>
          <ChartjsGraph />
        </div> */}
        <PlotlyGraph  
          data={this.state.data}
          layout={this.state.layout}
          config={this.state.config}
          />
        <button onClick={this.handleIMUControl}>[RPC] IMU Control</button>
      </div>
    );
  }
}

export default Service;
