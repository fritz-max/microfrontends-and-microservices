import React from "react";

const RemoteApp = React.lazy(() => import("mfe1/App"));

const App = () => (
  <div>
    <h1>Prototype Composite UI</h1>
    <h2>Instrument 1 Microfrontend:</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteApp  />
      </React.Suspense>
    </div>
  </div>
);

export default App;
