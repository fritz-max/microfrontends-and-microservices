import React from "react";
import ChartjsGraph from './instrumentGraph';
import PlotlyGraph from "./plotlyGraph"

const Service = () => (
  <div style={
    {backgroundColor: "WhiteSmoke", textAlign: "center"}
  }>
    <h1>Microfrontend</h1>
    <ChartjsGraph />
    <PlotlyGraph />
  </div>
);

export default Service;
