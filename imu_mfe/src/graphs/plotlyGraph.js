import React from 'react';
import Plot from 'react-plotly.js';

class PlotlyGraph extends React.Component {
    constructor() {
        super();

        this.state = {
            layout: {
                showlegend: true,
                datarevision: 0,
                xaxis: {
                  autorange: false,
                  type: "date"
                }
            }, 
            config: {
                scrollZoom: true
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