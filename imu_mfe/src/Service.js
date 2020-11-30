import React from "react";
import PlotlyGraph from "./plotlyGraph";
import { Wamp, ConnectionSettings } from './Connection';


class Service extends React.Component {
  constructor() {
    super();

    this.wamp = new Wamp()
    this.connectionSettings = new ConnectionSettings()
    this.plotlyGraphRef = React.createRef();
      
    this.handleIMUControlButton = this.handleIMUControlButton.bind(this)
  }

  componentDidMount() {
    const plotlyGraphInst = this.plotlyGraphRef.current;

    this.wamp.subscribe(this.connectionSettings.subscribeTopics["IMU"], (args) => {
      plotlyGraphInst.updatePlotData(args)
    })

    this.wamp.openConnection();
  }

  componentWillUnmount() {
    this.wamp.closeConnection();
  }

  handleIMUControlButton() {
    this.wamp.callRPC(this.connectionSettings.callerTopics["IMU/control_measurement"])
  }

  render() {
    return (
      <div style={
        {backgroundColor: "WhiteSmoke", textAlign: "center"}
      }>
        <h1>Microfrontend</h1>
        <PlotlyGraph 
          ref={this.plotlyGraphRef} 
        />
        <p></p>
        <button onClick={this.handleIMUControlButton}>[RPC] IMU Control</button>
      </div>
    );
  }
}

export default Service;
