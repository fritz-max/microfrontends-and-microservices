import React from "react";
import ChartjsGraph from './chartjsGraph';
import PlotlyGraph from "./plotlyGraph"

const Service = () => (
  <div style={
    {backgroundColor: "WhiteSmoke", textAlign: "center"}
  }>
    <h1>Microfrontend</h1>
    <div style={{width: "750px"}}>
      <ChartjsGraph />
    </div>
    <PlotlyGraph />
  </div>
);

export default Service;
