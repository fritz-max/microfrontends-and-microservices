import React from "react";

// Example of loading a remote component
const RemoteService1 = React.lazy(() => import("imu_mfe/Service"));
const RemoteService2 = React.lazy(() => import("acc_mfe/Service"));


const App = () => (
  <div>
    <h1 style={{fontFamily: "sans-serif"}}>AirVisor Composite UI</h1>
    {/* <p>Nothing included yet. Include components in "src/App.js" of your composite UI service</p> */}
    <h2 style={{fontFamily: "sans-serif"}}>IMU</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteService1  />
      </React.Suspense>
    </div>
    <h2 style={{fontFamily: "sans-serif"}}>ACC</h2>
    <div style={{width: "1000px"}}>
      <React.Suspense fallback="Loading App">
        <RemoteService2  />
      </React.Suspense>
    </div>
  </div>
);

export default App;
