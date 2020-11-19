import React from "react";

// Example of loading a remote component
const RemoteService1 = React.lazy(() => import("instrument1_mfe/Service"));
// const RemoteService2 = React.lazy(() => import("mfe2/Service"));


const App = () => (
  <div>
    <h1>Prototype Composite UI</h1>
    {/* <p>Nothing included yet. Include components in "src/App.js" of your composite UI service</p> */}
    <h2>MFE-1</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteService1  />
      </React.Suspense>
    </div>
    {/* <h2>MFE-2</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteService2  />
      </React.Suspense>
    </div> */}
  </div>
);

export default App;
