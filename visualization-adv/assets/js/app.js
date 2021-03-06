
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
        .attr("axis", "x")
        .attr("value", "poverty")
        .attr("class", "axText active x ")        
        .text("Poverty (%)");

xNames.append('text')
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + 75)
        .attr("axis", "x")
        .attr("value", "income")
        .attr("class", "axText inactive x")        
        .text("House Income (%)");

xNames.append('text')
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + 100)
        .attr("axis", "x")
        .attr("value", "age")
        .attr("class", "axText inactive x")        
        .text("Age (median)");

yNames.append('text').attr("transform", "rotate(-90)")
        .attr("x", -chartWidth / 4)
        .attr("y", chartHeight / 2 - 290 )
        .attr("axis", "y")
        .attr("value", "healthcare")
        .attr("class", "axText active y")            
        .text("Healthcare (%)");

yNames.append('text').attr("transform", "rotate(-90)")
        .attr("x", -chartWidth / 4)
        .attr("y", chartHeight / 2 - 270 )
        .attr("axis", "y")
        .attr("value", "smokes")
        .attr("class", "axText inactive y")            
        .text("Smokes (%)");

yNames.append('text').attr("transform", "rotate(-90)")
        .attr("x", -chartWidth / 4)
        .attr("y", chartHeight / 2 - 250 )
        .attr("axis", "y")
        .attr("value", "obesity")
        .attr("class", "axText inactive y")            
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
        .attr("class", "x-axis")      
        .attr("transform", `translate(0, ${chartHeight})`)        
        .call(xAxis);
        
    chartGrp.append('g')
        .attr("class", "y-axis")
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
                        .data(data).enter()
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
                        .data(data).enter()
                        .append('tspan')
                        .attr('x', d => xScale(d[dataX] - 0.1))
                        .attr('y', d => yScale(d[dataY] - 0.1))
                        .attr('font-size', circleProps.fntSize)
                        .text(d => d.abbr);
    

    // Change the appereance of axes when one is clicked.
    function changeAxes (axValue, axis) {

        // Change class of the not selected labels - from active to inactive.
        d3.selectAll(".axText")
            .filter(".active")
            .filter("." + axis)
            .classed("active", false)
            .classed("inactive", true);

        // Set selected text to active.
        axValue.classed("inactive", false).classed("active", true);
    } // ----- END changeAxes() function.


    // Use the given axText class to the axes labes to select 
    // different data variable to modify the scatter plot.
    d3.selectAll('.axText').on('click', function() {

        let label = d3.select(this);        

        if (label.classed("inactive")) {            
            let value = label.attr("value");   // Get the property value of the selected variable.
            let ax = label.attr("axis");     // Get the axis of the selected text.

            // Selected label is from X axis.
            if (ax === 'x') {
                // Change the 'initial' value X to the selected label.
                dataX = value;                
                getXMinMax();
                xScale.domain([xMin, xMax]);

                // Update the x axis with trasition.
                chartGrp.select('.x-axis').transition().duration(1500).call(xAxis);
                console.log(xMin, xMax);

            } else { // Selected label is from Y axis.         
                // Change the 'initial' value Y to the selected label.
                dataY = value;                
                getYMinMax();
                yScale.domain([yMin, yMax]);

                // Update the x axis with trasition.
                chartGrp.select('.y-axis').transition().duration(1500).call(yAxis);

            } // ----- END if statment that checks which axis is selected.

            // Change axes class and appereance.
            changeAxes(label, ax);
        } 

    }); // ----- END on click event on labels with D3.
}); // ----- END reading data and visualizations using D3.