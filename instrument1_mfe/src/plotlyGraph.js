import React from 'react';
import Plot from 'react-plotly.js';

import Wamp from './wamp';
import ConnectionSettings from "./ConnectionSettings";


function rand() {
    return Math.random()*10;
}

var traceProto = {
    x: [0],
    y: [0],
    type: 'line'
};


class PlotlyGraph extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: [
                {
                    x: [0],
                    y: [0],
                    type: 'line',
                    name: 'data1'
                },
                {
                    x: [0],
                    y: [0],
                    type: 'line',
                    name: 'data2'
                },
                {
                    x: [0],
                    y: [0],
                    type: 'line',
                    name: 'data3'
                }
            ], 
            layout: {
                title: 'Scroll and Zoom',
                showlegend: true,
                datarevision: 0,
                xaxis: {
                    range: [1, 100]
                }
            }, 
            config: {
                scrollZoom: true
            }
        };

        this.wamp = new Wamp()
        this.connectionSettings = new ConnectionSettings()
        
        this.handleClick = this.handleClick.bind(this)
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        // setInterval(this.update, 1000);
        this.wamp.subscribe(this.connectionSettings.subscribeTopics[0], (args) => {
            this.update(args)
        })
        this.wamp.openConnection();
    }
    
    update(args) {
        var newDataSet0 = this.state.data[0];
        var newDataSet1 = this.state.data[1];
        var newDataSet2 = this.state.data[2];

        console.log(args[1][0], args[1][1])
        
        newDataSet0.x.push(newDataSet0.x[newDataSet0.x.length-1]+1)
        newDataSet0.y.push(args[1][0])
        newDataSet1.x.push(newDataSet1.x[newDataSet1.x.length-1]+1)
        newDataSet1.y.push(args[1][1])
        newDataSet2.x.push(newDataSet2.x[newDataSet2.x.length-1]+1)
        newDataSet2.y.push(args[1][2])

        var newData = [newDataSet0, newDataSet1, newDataSet2]

        this.setState({data: newData});

        if (newDataSet0.x.length >= 100) {
            var layout = this.state.layout
            layout.xaxis.range = [newDataSet0.x.length-100, newDataSet0.x.length]
        }
        
        // bump revision to force update
        var layout = this.state.layout
        layout.datarevision = layout.datarevision+1 
        this.setState({layout})
    }

    handleClick() {
        this.addDataPoint();
    }

    componentWillUnmount() {
        this.wamp.closeConnection();
    }

    render() {
      return (
        <Plot
        data={this.state.data}
        layout={this.state.layout}
        config={this.state.config}
        revision={this.state.revision}
        onInitialized={(figure) => this.setState(figure)}
        onUpdate={(figure) => this.setState(figure)}
        />
    );
    }
}

export default PlotlyGraph