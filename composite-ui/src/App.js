import React from "react";

const RemoteApp1 = React.lazy(() => import("mfe1/App"));
const RemoteApp2 = React.lazy(() => import("mfe2/App"));


const App = () => (
  <div>
    <h1>Prototype Composite UI</h1>
    <h2>Instrument 1 Microfrontend:</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteApp1  />
      </React.Suspense>
    </div>
    <h2>Instrument 2 Microfrontend:</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteApp2  />
      </React.Suspense>
    </div>
  </div>
);

export default App;
