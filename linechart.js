function dropdown(k){
  makeLineChart(k);
  createBar(2010, k);
  d3.select("#Title")
  .transition()
  .text(k);
}

function makeLineChart(countryLine){


var countryLine = countryLine.toUpperCase();
console.log(countryLine);
var dataDict = {}
var countryDict = {}


d3.json("data_nation.json").then(function(data){
console.log(data)

lijst = []

for (year in data){
  if (!isNaN(+data[year][countryLine])){
  obj = {}

  obj["Year"] = year;
  obj["Value"] = ((+data[year][countryLine]) * 3.667)
  // console.log(obj["Value"]);

  lijst.push(obj)

}
else {
  d3.select("#Year")
  .transition()
  .text(country)
  d3.select("#Title")
  .transition()
  .text("No data Available")
  createBar("")
}
}


  var width = 750;
  var height = 400;


  var margin = 50
  var width = 700
  var height = 400



  var xScaleData = d3.scaleBand()
      .domain(["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"]) // input
      .range([margin + 25, width - margin])

  var yScaleData = d3.scaleLinear()
      .domain([(d3.max(lijst, function(d){return d["Value"]})), d3.min(lijst, function(d){return d["Value"]/1.05})]) // input
      .range([margin, height - margin])


  var line = d3.line()
      .x(function(d) {return (xScaleData(d.Year) - 8)})
      // d3.max(d.Year, function(d) { return d; })
      .y(function(d) {return ((yScaleData(d.Value)))})


      // x.domain(d3.extent(, function(d) { return +d}));
      // y.domain(d3.extent(Object.values(countryDict), function(d) { return +d }));

  var svg = d3.select("#Linechart")
    .attr("width", width)
    .attr("height", height);
    // .selectAll("path")
    // .selectAll("g")
    // .selectAll("circle")
    // .data(lijst);
  // var div = svg
  //     .append("g")
      // .style("display", "true")
      // .attr("class", "tooltip")
      // .style("opacity", 1)
      // .style("font-size", "11px")
      // .style("font-family", "sans-serif");

  var div = svg.append("text")
    .attr("id", "tooltip")
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
      // .datum(lijst)
      .attr("fill", "none")
     .attr("stroke", "rgb(102, 140, 255)")
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .attr("stroke-width", 3)
     .attr("id", "line")
     .attr("transform", "translate(20,0)")
     // .attr("d", line);


  svg.select("#line")
    .datum(lijst)
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
                    .data(lijst);

        scatter.enter()
        .append("circle")
        .attr("r", 5)
        .attr("class", countryLine)
        .on('mouseover',function(d){
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
        .on('mouseout',function(d){
          d3.select(this)
          .style("opacity",1)
          })

        .on("click",(function(d){
          createBar(d["Year"], this.getAttribute("class"))
          // createYear(d["Year"])
        }))





        .merge(scatter)
        .transition()
        .duration(1500)
        .attr("class", countryLine)
        .attr("cx", (lijst, function(d)
        {return xScaleData(d["Year"]) + 12  }))
        .attr("cy", (lijst, function(d)
        {
          return (yScaleData(d["Value"]))}))
        .on("click",(function(d){
          createBar(d["Year"], countryLine)
        }))

        scatter.exit().remove();



})
}
