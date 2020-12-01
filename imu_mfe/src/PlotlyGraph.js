import React from 'react';
import Plot from 'react-plotly.js';
var Plotly = require('plotly.js/lib/core');

class PlotlyGraph extends React.Component {
    constructor() {
        super();

        // State of the component handles the Plotly.js specific dataset, layout and config objects
        this.state = {
            datasets: [
                {
                    x: [],
                    y: [],
                    type: 'scattergl',
                    name: 'data1',
                    mode: 'lines+markers'
                },
                {
                    x: [],
                    y: [],
                    type: 'scattergl',
                    name: 'data2',
                    mode: 'lines+markers'
                },
                {
                    x: [],
                    y: [],
                    type: 'scattergl',
                    name: 'data3',
                    mode: 'lines+markers'
                }
            ],
            layout: {
                showlegend: true,
                autosize: false,
                width: 1000,
                height: 500,
                margin: {
                    l: 50,
                    r: 50,
                    b: 75,
                    t: 50,
                    pad: 4
                },
                datarevision: 0,
                xaxis: {
                    autorange: false,
                    type: "date",
                    title: "Time"
                },
                yaxis: {
                    type: "linear",
                    fixedrange: true
                }
            }, 
            config: {
                scrollZoom: true,
                modeBarButtonsToAdd: [
                    {
                        name: "Y-Axis Type Toggle",
                        icon: Plotly.Icons.pencil,
                        click: () => { this.setState(oldState => {
                            return {layout: {yaxis: {type: (oldState.layout.yaxis.type === "linear") ? "log" : "linear"}}}
                        })}
                    }
                ]
            }
        }

        // React specific function bindings
        this.onUpdate = this.onUpdate.bind(this)
        this.updatePlotData = this.updatePlotData.bind(this)
    }

    onUpdate (figure) {
        var layout = figure.layout

        // update the layout to scroll the x-Axis
        var olderTime = figure.data[0].x[(figure.data[0].x.length <= 50) ? 0 : figure.data[0].x.length-50]
        var futureTime = figure.data[0].x[figure.data[0].x.length-1]
        layout.xaxis.range = [ olderTime, futureTime ]
 
        layout.datarevision = layout.datarevision+1 
        this.setState(figure)
    }

    updatePlotData (newData) {
        // update function that is registered as the callback to the wamp subscription. Updates dataset state
        var newDatasets = []
        var timestamp = new Date()
        
        this.state.datasets.forEach((dataset, idx) => {
          dataset.x.push(timestamp)
          dataset.y.push(newData[1][idx])
          newDatasets.push(dataset)
        })
        
        this.setState({
          datasets: newDatasets
        });
    }

    render() {
        return (
            <Plot
                data={this.state.datasets}
                layout={this.state.layout}
                config={this.state.config}
                onInitialized={(figure) => this.setState(figure)}
                onUpdate={this.onUpdate}
            />
        );
    }
}

export default PlotlyGraph