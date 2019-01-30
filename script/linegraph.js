/*
Rutger Storm
12444049
Programmeerproject
Linegraph
*/

// Function that gives the chosen country from the dropdown button
function dropdown(k){
  makeLineChart(k);
  createBar(2010, k);
  d3.select("#Title")
  .transition()
  .text(k);
}

// The country on which is clicked comes in
function makeLineChart(countryLine){


var countryLine = countryLine.toUpperCase();

//  Loading in the data for through a json file
d3.json("Json_files/data_nation.json").then(function(data){


dataList = []

// If there is data avaiable, prepare the data in the right way
for (year in data){
  if (!isNaN(+data[year][countryLine])){
  dataDict = {}

  dataDict["Year"] = year;
  dataDict["Value"] = ((+data[year][countryLine]) * 3.667)


  dataList.push(dataDict)

}
// If there's no data avaiable, display 'No data available'
else {
  d3.select("#Year")
  .transition()
  .text("")
  d3.select("#Title")
  .transition()
  .text("No data Available")
  createBar()
}
}


  var margin = 50
  var width = 570
  var height = 400


  // Adjusting the xScale
  var xScaleData = d3.scaleBand()
      .domain(["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"])
      .range([(2*margin), width - margin])

  // Adjusting the yScale
  var yScaleData = d3.scaleLinear()
      .domain([(d3.max(dataList, function(d){return d["Value"]})), d3.min(dataList, function(d){return d["Value"]/1.05})]) // input
      .range([margin, height - margin])

  // Creating the svg for the linechart
  var svg = d3.select("#Linechart")
    .attr("width", width)
    .attr("height", height);

  // Appending the tooltip
  var tooltip = svg.append("text")
    .attr("id", "tooltip")
    .style("opacity", 0.8)
    .attr("x", 50)
    .attr("y", 50)
    .style("font-size", "12px")
    .attr("class", "tooltip")


function textUnits(){

  // Title for the linegraph
  svg.append("text")
        .attr("id", "graphTitle")
        .attr("transform", "translate(450, 25)")
        .style("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "12px")

  // Units for x-axis
  svg.append("text")
        .attr("id", "xAxisUnit")
        .attr("transform", "translate(450, 390)")
        .style("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "11px")

  // Units for y-axis
  svg.append("text")
          .attr("id", "yAxisUnit")
          .attr("x",-355)
          .attr("y", 80)
          .attr("transform", "rotate(-90)")
          .style("text-anchor", "end")
          .style("font-family", "sans-serif")
          .style("font-size", "8px")

  // Update the title of the linegraph
  svg.select("#graphTitle")
    .transition()
    .duration(1000)
      .text("Total CO2 emission in Thousand Metric Tons (1000 Ton)");

  // Update the units for the x-axis
  svg.select("#xAxisUnit")
    .transition()
    .duration(1000)
      .text("Year");

  // Update the units for the y-axis
  svg.select("#yAxisUnit")
    .transition()
    .duration(1000)
      .text("1000 Tons");

}
textUnits()

    // Appending the total x-axis
    svg.append("g")
      .attr("class", "xAxis")
      .style("font-family", "sans-serif")
      .style("font-size", "8px")
      .attr("transform", "translate(-10," + (height - 50) + ")")

    // Appending the total y-axis
    svg.append("g")
        .attr("class", "yAxis")
        .style("font-family", "sans-serif")
        .style("font-size", "8px")
        .attr("transform", "translate(90,0)")

    // Updating the total x-axis
    svg.select(".xAxis")
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xScaleData));

    // Updating the total y-axis
    svg.select(".yAxis")
      .transition()
      .duration(1000)
      .call(d3.axisLeft(yScaleData));


function lineGraph(){
  var line = d3.line()
      .x(function(d) {return (xScaleData(d.Year) - 15)})
      .y(function(d) {return ((yScaleData(d.Value)))})

  // Layout for the line in the graph
  svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "rgb(102, 140, 255)")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 3)
    .attr("id", "line")
    .attr("transform", "translate(20,0)")

  // Updating the line
  svg.select("#line")
    .datum(dataList)
    .transition()
      .duration(1000)
      .attr("d", line);

}
lineGraph()

function scatter(){
  /*
  Plotting a scatter over the linegraph, making use of x and y position of
  the linegraph
  */
  var scatter = svg.selectAll("circle")
                .data(dataList);
      scatter.enter()
      .append("circle")
      .attr("r", 5)
      .attr("class", countryLine)
      .on("mouseover",function(d){
        tooltip
        .attr("x",100)
        .attr("y", 45)
        .attr("font-family", "Helvetica")
        .style("display", "true")
        .text((Math.round(d.Value)));
        d3.select(this)
          .style("opacity",0.4)
      })
      .on("mouseout",function(d){
        d3.select(this)
        .style("opacity",1)
        })
      .on("click",(function(d){
        createBar(d["Year"], this.getAttribute("class"))
      }))
      // Updating the scatter plot
      .merge(scatter)
      .transition()
      .duration(1500)
      .attr("class", countryLine)
      .attr("cx", (dataList, function(d)
      {return xScaleData(d["Year"]) + 4  }))
      .attr("cy", (dataList, function(d)
      {
        return (yScaleData(d["Value"]))}))
      .on("click",(function(d){
        createBar(d["Year"], countryLine)
      }))
      scatter.exit().remove();


}
scatter()
})
}
