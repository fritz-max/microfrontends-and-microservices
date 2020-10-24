import React from 'react';
import {Line} from 'react-chartjs-2';

import autobahn from 'autobahn-browser';


const initialState = {
  labels: [1,2,3,4,5,6,7],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};


class Graph extends React.Component {
    constructor () {
        super()
        this.state = {}
    }
    
    componentWillMount(){
		this.setState({graphData: initialState});
    }
    
	componentDidMount(){
        
        this.autobahnConnection = new autobahn.Connection({
            url: 'ws://localhost:8080/ws',
            realm: 'realm1'
        })

        this.autobahnConnection.onopen = (session, details) => {
            session.subscribe("com.myapp.hello", (args) => {
                console.log('Received Message: ', args[0])

                var oldDataSet = this.state.graphData.datasets[0];
                var newDataSet = {
                    ...oldDataSet
                };
                
                var newData = [...newDataSet.data, args[1]];        
                newDataSet.data = newData;

                var oldLabels = this.state.graphData.labels;
                var newLabels = [...oldLabels, args[0]]

                var newState = {
                    labels: newLabels,
                    datasets: [newDataSet]
                };

                this.setState({graphData: newState});
                
            });
        }

        this.autobahnConnection.open();

    }
    
    componentWillUnmount() {
        this.autobahnConnection.close();
    }

	render() {
		return (
			<Line data={this.state.graphData} />
		);
	}
}

export default Graph