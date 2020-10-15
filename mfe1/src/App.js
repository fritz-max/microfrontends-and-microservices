import LocalButton from "./Button";
import React from "react";

// import LineExample from "./LineGraph";

var autobahn = require('autobahn')

const App = () => (
  <div style={
    {backgroundColor: "WhiteSmoke", textAlign: "center"}
  }>
    <h1>Microfrontend</h1>
    {/* <LineExample /> */}
    <LocalButton />
  </div>
);

export default App;
