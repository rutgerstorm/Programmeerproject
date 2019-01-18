// function makeLineChart(countryLine){

console.log(countryLine);
var dataDict = {}
var regionDict = {}
// var years = []

d3.json("data_piechart.json").then(function(data){

  // console.log(data)
  lijst = []

  for (year in data){
    obj = {}

    obj["Year"] = Math.abs(year);
    obj["Value"] = data[year][countryLine]
    // console.log(data[year][countryLine]);
    lijst.push(obj)

  }
  makeBar()






// function creatingData(){
// d3.json("data_region1.json").then(function(data)
// {
// generalValues = Object.values(data)
// // console.log(generalValues)
// regionValues =  Object.values(generalValues)
//
//
// year = Object.keys(data)
//
//
// regions = Object.keys(generalValues[0])

// for (i = 0; i < year.length; i++)
// {
//   // console.log(year[i])
//   // console.log(regions)
//   // console.log(Object.values(regionValues[i]))
//   for (x = 0; x < 15; x++)
//   {
//     regionDict[(regions[x])] = ((Object.values(regionValues[i])[x]));
//
//     // dataDict[year[i]] = ((regionDict[regions[x]]) = (Object.values(regionValues[i])[x]))
//     dataDict[year[i]] = regionDict
//
//   }
//
// }
//
// // dataDict[data1[i].time].push([data1[i].Country, data1[i].datapoint, data2[j].datapoint])
// }
// }
// creatingData()
//   Selecting the values of the countries, push it into lists
//   keys = Object.keys(data);
//   values = Object.values(data)
//   keys.forEach(function(d){
//   region.push(d)
//     })
//   values.forEach(function(d){
//   totalPercentage.push(d.Total)
//   menPercentage.push(d.Men)
//   womenPercentage.push(d.Women)
//   })
//   // makeBar()
//   })
// }
// creatingData()

//

function makeBar(){
  //Width and height from the SVG
  var w = 750;
  var h = 400;
  var barPadding = 2;
  var margin = 30

  var svg = d3.select("body")
    .append("svg")
    .attr("width", w + 5)
    .attr("height", h + 5);


  // Adjusting the xScale
  var xScale = d3.scaleBand()
    .domain([obj["Year"]])
    .range([0, w]);

  // Adjusting the yScale
  var yScale = d3.scaleLinear()
         .domain([45000, 55000])
         .range([h, 0]);
//
// // Added a tooltip which shows the exact value for every country
// var tooltip = d3.select('body').append("div")
//    .style("display", "true")
//    .style("fill", "orange")
//    .style("font-size", "11px")
//    .style("font-family", "sans-serif")
//    .text("Unemployment Rate");
//
//
//
  // Create the barchart
  svg.selectAll("rect")
      .data(obj["Value"])
      .enter()
      .append("rect")
      .attr("y", function(d) {
        return yScale(d) + (0.5 * margin);
      })
      .attr("width", (w - margin) / (25 + 1))
      .attr("height", function(d) {
        return h - (margin) - yScale(d);
       })
      .attr("x", function(d) {
        return xScale(d) + margin;
         })
      .attr("fill", function(d) {
       return "rgb(0, 0, " + (d * 15) + ")"
     })

   }

 })
