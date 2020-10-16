import React from 'react';
import autobahn from 'autobahn-browser';

class Subscriber extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        connectionStatus: 0,
        currentMessage: ""
      };
      this.setMsgState = this.setMsgState.bind(this);
    }

    setMsgState(newMessage) {
        this.setState(currentState => {
            return { currentMessage: newMessage };
        });
    }

    componentDidMount() {

        var autobahnConnection = new autobahn.Connection({
            url: 'ws://localhost:8080/ws',
            realm: 'realm1'
        })

        autobahnConnection.onopen = (session, details) => {
            console.log("Established and openend autobahn connection.")
            
            session.subscribe("com.myapp.hello", (args) => {
                console.log('Received Message: ', args[0])
                this.setMsgState(args[0]);
            });
        }

        autobahnConnection.open();    
    }
  
    render() {
      return (
        <div>
            <p>Subscriber Component</p>
            <p>Message: {this.state.currentMessage}</p>
        </div>
      );
    }
  }

export default Subscriber;