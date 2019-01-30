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
d3.json("Json files/data_nation.json").then(function(data){


dataList = []

for (year in data){
  if (!isNaN(+data[year][countryLine])){
  dataDict = {}

  dataDict["Year"] = year;
  dataDict["Value"] = ((+data[year][countryLine]) * 3.667)


  dataList.push(dataDict)

}
else {
  d3.select("#Year")
  .transition()
  .text("")
  d3.select("#Title")
  .transition()
  .text("No data Available")
  createBar("")
}
}


  var margin = 50
  var width = 700
  var height = 400


  var xScaleData = d3.scaleBand()
      .domain(["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"]) // input
      .range([margin + 25, width - margin])

  var yScaleData = d3.scaleLinear()
      .domain([(d3.max(dataList, function(d){return d["Value"]})), d3.min(dataList, function(d){return d["Value"]/1.05})]) // input
      .range([margin, height - margin])


  var line = d3.line()
      .x(function(d) {return (xScaleData(d.Year) - 8)})
      // d3.max(d.Year, function(d) { return d; })
      .y(function(d) {return ((yScaleData(d.Value)))})


      // x.domain(d3.extent(, function(d) { return +d}));
      // y.domain(d3.extent(dataDictect.values(countryDict), function(d) { return +d }));

  var svg = d3.select("#Linechart")
    .attr("width", width)
    .attr("height", height);
  

  var div = svg.append("text")
    .attr("id", "tooltip")
    .style("opacity", 0.8)
    .attr("x", 50)
    .attr("y", 50)
    .attr("class", "tooltip")

  svg.append("text")
        .attr("id", "graphTitle")
        .attr("transform", "translate(450, 25)")
        .style("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "17px")


  svg.append("text")
        .attr("id", "xAxisUnit")
        .attr("transform", "translate(600, 390)")
        .style("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "13px")


  svg.append("text")
          .attr("id", "yAxisUnit")
          .attr("x",-345)
          .attr("y", 10)
          .attr("transform", "rotate(-90)")
          .style("text-anchor", "end")
          .style("font-family", "sans-serif")
          .style("font-size", "11px")



    svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(-10," + (height - 50) + ")")
      // .call(d3.axisBottom(xScaleData));

      svg.append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(65,0)")
          // .call(d3.axisLeft(yScaleData));

// linegraph = function(country){
    svg.append("path")
      // .datum(dataList)
      .attr("fill", "none")
     .attr("stroke", "rgb(102, 140, 255)")
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .attr("stroke-width", 3)
     .attr("id", "line")
     .attr("transform", "translate(20,0)")
     // .attr("d", line);


  svg.select("#line")
    .datum(dataList)
    .transition()
      .duration(1000)
      .attr("d", line);

  svg.select("#graphTitle")
    .transition()
    .duration(1000)
      .text("Total CO2 emission in Thousand Metric Tons (1000 Ton)");

  svg.select("#xAxisUnit")
    .transition()
    .duration(1000)
      .text("Year");

  svg.select("#yAxisUnit")
    .transition()
    .duration(1000)
      .text("1000 Tons");


  svg.select(".yAxis")
    .transition()
    .duration(1000)
    .call(d3.axisLeft(yScaleData));

    svg.select(".xAxis")
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xScaleData));


     var scatter = svg.selectAll("circle")
                    .data(dataList);

        scatter.enter()
        .append("circle")
        .attr("r", 5)
        .attr("class", countryLine)
        .on("mouseover",function(d){
          div
          .attr("x",65)
          .attr("y", 43)
          .attr("font-family", "Helvetica")
          .style("display", "true")
          .text((Math.round(d.Value)));
          d3.select(this)
            .style("opacity",0.4)
        //     .text(function(d, i) { return d["Value"]; })
        })
        .on("mouseout",function(d){
          d3.select(this)
          .style("opacity",1)
          })

        .on("click",(function(d){
          // if (year < 2011){
          createBar(d["Year"], this.getAttribute("class"))
        // }
        // else {
        //     d3.select("#Year")
        //     .transition()
        //     .text()
        //     d3.select("#Title")
        //     .transition()
        //     .text("No data Available")
        //     createBar("")
        // }
          // createYear(d["Year"])
        }))





        .merge(scatter)
        .transition()
        .duration(1500)
        .attr("class", countryLine)
        .attr("cx", (dataList, function(d)
        {return xScaleData(d["Year"]) + 12  }))
        .attr("cy", (dataList, function(d)
        {
          return (yScaleData(d["Value"]))}))
        .on("click",(function(d){
          createBar(d["Year"], countryLine)
        }))

        scatter.exit().remove();



})
}
