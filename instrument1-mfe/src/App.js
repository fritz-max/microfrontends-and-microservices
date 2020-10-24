import LocalButton from "./Button";
import React from "react";
import Subscriber from './Subscriber'
import LineExample from './LineGraph'


const App = () => (
  <div style={
    {backgroundColor: "WhiteSmoke", textAlign: "center"}
  }>
    <h1>Microfrontend</h1>
    <LineExample />
    {/* <Subscriber /> */}
    <LocalButton />
  </div>
);

export default App;
