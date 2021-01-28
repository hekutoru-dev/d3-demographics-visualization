
// Set margin for the layout
let margin = {
    top: 20,
    right: 40,
    botton: 110,
    left: 100
}

// Define svg area dimensions
let svgWidth = 960, svgHeight = 550;
let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper and group.
let svg = d3.select('#scatter')
            .append('svg')
            .attr('height', svgHeight)
            .attr('width', svgWidth);

let chartGrp = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);          

// Import csv data.
d3.csv("assets/data/data.csv").then((data) => {

    let xMin, xMax, yMin, yMax;
    // Set initial values to plot.
    let dataX = "poverty";
    let dataY = "healthcare";

    // Get min & max values of the chosen data variables.
    function getXMinMax() {
        xMin = d3.min(data, d => +d[dataX]);
        xMax = d3.max(data, d => +d[dataX]);
    }
    
    function getYMinMax() {
        yMin = d3.min(data, d => +d[dataY]);
        yMax = d3.max(data, d => +d[dataY]);
    }

    getXMinMax();
    getYMinMax();

    console.log(xMin);
    console.log(yMin);

});