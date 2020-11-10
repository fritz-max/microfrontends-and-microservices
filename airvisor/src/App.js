import React from "react";

// Example of loading a remote component
const RemoteApp1 = React.lazy(() => import("instrument1_mfe/App"));


const App = () => (
  <div>
    <h1>Prototype Composite UI</h1>
    <h2>MFE-1</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteApp1  />
      </React.Suspense>
    </div>
    {/* <h2>MFE-2</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteApp2  />
      </React.Suspense>
    </div> */}
  </div>
);

export default App;