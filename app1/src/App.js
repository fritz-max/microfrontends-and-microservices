import React from "react";

const RemoteButton = React.lazy(() => import("app2/Button"));
const RemoteApp = React.lazy(() => import("app2/App"));

const App = () => (
  <div>
    <h1>This is the Container</h1>
    <h2>Rendering complete Microfrontend:</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteApp  />
      </React.Suspense>
    </div>
    <h2>Rendering a single Component from the Microfrontend individually:</h2>
    <div>
      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
    </div>
  </div>
);

export default App;
