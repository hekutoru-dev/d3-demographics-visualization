
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

    // Create Scales for X & Y from min & max values.
    let xScale = d3.scaleLinear()
                    .domain([xMin, xMax])
                    .range([0, chartWidth]);
    let yScale = d3.scaleLinear()
                    .domain([yMin, yMax])
                    .range([chartHeight, 0]);
    
    // Create & append the axes. Uses svg to draw them.
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    chartGrp.append('g')
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)        
        .call(xAxis);
        
    chartGrp.append('g')          
        .call(yAxis);    
    

});