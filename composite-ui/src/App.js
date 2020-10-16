import React from "react";

const RemoteButton = React.lazy(() => import("mfe1/Button"));
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
    {/* <h2>Rendering a single Component from the Microfrontend individually:</h2>
    <div>
      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
    </div> */}
  </div>
);

export default App;
