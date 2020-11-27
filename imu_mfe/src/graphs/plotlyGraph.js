import React from 'react';
import Plot from 'react-plotly.js';


class PlotlyGraph extends React.Component {
    constructor() {
        super();
    }

    render() {
      return (
        <Plot
        data={this.props.data}
        layout={this.props.layout}
        config={this.props.config}
        onInitialized={(figure) => this.setState(figure)}
        onUpdate={(figure) => this.setState(figure)}
        // onRelayout={() => console.log("relayout")}
        />
    );
    }
}

export default PlotlyGraph