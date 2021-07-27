// @TODO: YOUR CODE HERE!
var svgWidth = 1200;
var svgHeight = 700;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv").then(function(stateData) {
    
    // grab data
    stateData.forEach(function(data){
        data.abbr = data.abbr; // abbreviations for hover function
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });
    var xLinearScale = d3.scaleLinear()
      .domain([9, d3.max(stateData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(stateData, d => d.healthcare)])
      .range([height, 0]);
  
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);
  
      chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
  
      chartGroup.append("g")
        .call(leftAxis)
    
    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "black")

    var circleLabels = chartGroup.selectAll(null).data(stateData).enter().append("text");
        circleLabels
          .attr("x", function(d) {
            return xLinearScale(d.poverty);
          })
          .attr("y", function(d) {
            return yLinearScale(d.healthcare);
          })
          .text(function(d) {
            return d.abbr;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .attr("text-anchor", "middle")
          .attr("fill", "white");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (svgHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Population without Healthcare (%)");
      
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Population Experiencing Poverty(%)");
});