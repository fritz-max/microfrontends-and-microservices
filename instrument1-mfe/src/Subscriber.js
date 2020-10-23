import React, { useState, useEffect }from 'react';
import autobahn from 'autobahn-browser';


function Subscriber () {
  const [currentMsg, setCurrentMsg] = useState("");
  const [connectionStatus, setConnStatus] = useState(0);

  useEffect(() => {
    var autobahnConnection = new autobahn.Connection({
      url: 'ws://localhost:8080/ws',
      realm: 'realm1'
    })

    // Important to use an arrow function here. It automatically binds it to the context of the object, 
    // so that "this." can be used. 
    autobahnConnection.onopen = (session, details) => {
        console.log("Established and openend autobahn connection.")
        setConnStatus(1);
        
        session.subscribe("com.myapp.hello", (args) => {
            console.log('Received Message: ', args[0])
            setCurrentMsg(args[0]);
        });
    }

    autobahnConnection.open();
  }, []) 
  // ^ IMPORTANT: the second param to useEffect is the condition. 
  // Passing nothing: run after every render (can be constrained by a condition, in an array)
  // Passing an empty arraay: run once after mounting (= old componentDidMount)

  return (
    <div>
        <p>Subscriber Component</p>
        <p>Connection Status: {connectionStatus}</p>
        <p>Current Message: {currentMsg}</p>
    </div>
  );
}

export default Subscriber;