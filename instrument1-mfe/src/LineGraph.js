// import React from 'react';
import {Line} from 'react-chartjs-2';
import React, { useState, useEffect }from 'react';
import autobahn from 'autobahn-browser';




function LineExample () {
  var data = {
    labels: [],
    datasets: [
      {
        label: 'Data from publisher',
        data: [],
        backgroundColor:'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const [currentMsg, setCurrentMsg] = useState("");
  const [connectionStatus, setConnStatus] = useState(0);

  useEffect(() => {
    var autobahnConnection = new autobahn.Connection({
      url: 'ws://localhost:8080/ws',
      realm: 'realm1'
    })

    autobahnConnection.onopen = (session, details) => {
        console.log("Established and openend autobahn connection.")
        setConnStatus(1);
        
        session.subscribe("com.myapp.hello", (args) => {
          data.labels.push(args[0])
          data.data.push(args[1])
          console.log('Received Message: ', args[0])
            // setCurrentMsg(args[0]);
        });
    }

    autobahnConnection.open();
  }, []) 
  return (
    <div>
        <h2>Line Example</h2>
        <Line data={data} />
    </div>
    );
}
export default LineExample;