
// Set margin for the layout
let margin = {
    top: 20,
    right: 40,
    bottom: 110,
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


// Set the circles properties. 
let circleProps = {
    radius : 8,
    color : '#f95d6a',
    stroke : '#000',
    opacity : '.5',
    fntSize: 10
}

// Add axes names.
chartGrp.append('g').attr('class', 'xText');
chartGrp.append('g').attr('class', 'yText');

let xNames = d3.select('.xText');
let yNames = d3.select('.yText');

xNames.append('text')
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + 50)
        .attr("value", "poverty")
        .attr("class", "axText active")        
        .text("Poverty (%)");

xNames.append('text')
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + 75)
        .attr("value", "income")
        .attr("class", "axText inactive")        
        .text("House Income (%)");

xNames.append('text')
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + 100)
        .attr("value", "age")
        .attr("class", "axText inactive")        
        .text("Age (median)");

yNames.append('text')
        .attr("transform", "rotate(-90)")
        .attr("x", -chartWidth / 4)
        .attr("y", chartHeight / 2 - 290 )
        .attr("value", "healthcare")
        .attr("class", "axText active")            
        .text("Healthcare (%)");

yNames.append('text')
        .attr("transform", "rotate(-90)")
        .attr("x", -chartWidth / 4)
        .attr("y", chartHeight / 2 - 270 )
        .attr("value", "smokes")
        .attr("class", "axText inactive")            
        .text("Smokes (%)");

yNames.append('text')
        .attr("transform", "rotate(-90)")
        .attr("x", -chartWidth / 4)
        .attr("y", chartHeight / 2 - 250 )
        .attr("value", "obesity")
        .attr("class", "axText inactive")            
        .text("Obesity (%)");

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
    
    // Create a function to show tooltips on each circle.
    let tooltips = d3.tip()
                        .attr('class', 'd3-tip')
                        .offset([40, -60])
                        .html(d => `${d.state}<br>${dataX}: ${d[dataX]}<br>${dataY}: ${d[dataY]}`);
    // ADD tooltips.
    chartGrp.call(tooltips);
    
    // Create a group of circles. Append each one for each data State.
    let crcGrp = chartGrp.selectAll('circle')
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr('cx', d => xScale(d[dataX]))
                        .attr('cy', d => yScale(d[dataY]))
                        .attr('r', circleProps.radius)
                        .attr('stroke', circleProps.stroke)
                        .attr('fill', circleProps.color)
                        .attr('opacity', circleProps.opacity);

    crcGrp.on('mouseover', function(d) {
        tooltips.show(d, this);
    })
    .on('mouseout', function(d) {
        tooltips.hide(d);
    })
    
    // Add text abbreviations to each data point. (State abbr)
    let textGroup = chartGrp.append('text')   
                        .selectAll('tspan')
                        .data(data)
                        .enter()
                        .append('tspan')
                        .attr('x', d => xScale(d[dataX] - 0.1))
                        .attr('y', d => yScale(d[dataY] - 0.1))
                        .attr('font-size', circleProps.fntSize)
                        .text(d => d.abbr);
    

    // Change the appereance of axes when one is clicked.
    function changeAxes () {

    }
                    
    // Use the given axText class to the axes labes to select 
    // different data variable to modify the scatter plot.
    d3.selectAll('.axText').on('click', function() {

        let ax = d3.select(this);
        console.log(ax);

        if (ax.classed("inactive")) {
            // Get the property value of the selected axis.
            let value = ax.attr("value")


            // Change axes class and appereance.
            changeAxes();            
        }
        

    });

});