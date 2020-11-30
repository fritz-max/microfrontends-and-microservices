import React from 'react';
import Plot from 'react-plotly.js';
var Plotly = require('plotly.js/lib/core');

class PlotlyGraph extends React.Component {
    constructor() {
        super();

        this.state = {
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

        this.onUpdate = this.onUpdate.bind(this)
    }

    onUpdate (figure) {
        var layout = figure.layout

        // scrolling x-Axis
        var olderTime = figure.data[0].x[(figure.data[0].x.length <= 50) ? 0 : figure.data[0].x.length-50]
        var futureTime = figure.data[0].x[figure.data[0].x.length-1]
        layout.xaxis.range = [ olderTime, futureTime ]
 
        layout.datarevision = layout.datarevision+1 
        this.setState(figure)
    }

    render() {
        return (
            <Plot
                data={this.props.data}
                layout={this.state.layout}
                config={this.state.config}
                onInitialized={(figure) => this.setState(figure)}
                onUpdate={this.onUpdate}
            />
        );
    }
}

export default PlotlyGraph