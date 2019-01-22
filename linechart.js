function makeLineChart(countryLine){


countryLine = countryLine.toUpperCase();
console.log(countryLine);
var dataDict = {}
var countryDict = {}


d3.json("data_nation.json").then(function(data){


generalValues = Object.values(data)

// year = Object.keys(data)
// console.log(year)
country = Object.keys((generalValues)[1])
countryValues =  Object.values((generalValues)[1])
// console.log(year)
// console.log(country)
// console.log(Object.values(countryValues))

lijst = []

for (year in data){
  obj = {}

  obj["Year"] = year;
  obj["Value"] = +data[year][countryLine]
  // console.log(data[year][countryLine]);

  lijst.push(obj)
}
console.log(lijst)
console.log(d3.max(lijst, function(d){return d["Value"]}))
console.log(d3.min(lijst, function(d){return d["Value"]}))
// for (i = 0; i < country.length; i++)
// {
//   for (j = 0; j < country.length; j++)
//   {
//       for (x = 0; x < year.length; x++)
//       {
//
//         countryDict[(year[x])] = (Object.values((countryValues)[x])[j])
//         dataDict[country[i]] = countryDict
//     // console.log(countryDict)
//     // regionDict[(regions[x])] = ((Object.values(regionValues[i])[x]));
//     // dataDict[country[i] = generalValues[i]
//
//   // // console.log(dataDict)
//     // console.log(Object.values((countryValues)[x])[i])
//       }
//   // console.log(year[x])
//   // console.log(country[i])
//
//   }
//   dataDict[country[i]] = countryDict
// }
// console.log(dataDict)


// })
// creatingData()


  //Width and height from the SVG
// function update(countryLine){
//   .on("click", function(g){
//     makeLineChart(g.properties.name)
//   })
// }
//

  var width = 750;
  var height = 400;


  var margin = 50
  var width = 750 // Use the window's width
  var height = 400



  var xScaleData = d3.scaleLinear()
      .domain([1999, 2015]) // input
      .range([0, width - margin])

  var yScaleData = d3.scaleLinear()
      .domain([(d3.max(lijst, function(d){return d["Value"]})), d3.min(lijst, function(d){return d["Value"]})]) // input
      .range([margin, height - margin])


  var line = d3.line()
      .x(function(d) {return (xScaleData(d.Year))+1})
      // d3.max(d.Year, function(d) { return d; })
      .y(function(d) {return ((yScaleData(d.Value)))})


      // x.domain(d3.extent(, function(d) { return +d}));
      // y.domain(d3.extent(Object.values(countryDict), function(d) { return +d }));

  var svg = d3.select("body")
    .append("svg")
    .attr("width", width + 5)
    .attr("height", height + 5);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(1," + (height - 50) + ")")
      .call(d3.axisBottom(xScaleData));

      svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(45,0)")
          .call(d3.axisLeft(yScaleData));

// linegraph = function(country){
    svg.append("path")
      .datum(lijst) // 10. Binds data to the line
      .attr("class", "line") // Assign a class for styling
      .attr("fill", "none")
     .attr("stroke", "rgb(102, 140, 255)")
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .attr("stroke-width", 3)
     .attr("d", line);

// linegraph(Afghanistan)

     svg.selectAll("circle")
        .data(lijst)
        .enter()
        .append("circle")
        .attr("cx", (lijst, function(d)
        {return xScaleData(d["Year"]);  }))
        .attr("cy", (lijst, function(d)
        {return (yScaleData(d["Value"]))}))
        .attr("r", 5)
        .on('mouseover',function(d){
          d3.select(this)
            .style("opacity",0.4)
            .text(function(d, i) { return d["Value"]; })
        })
        .on('mouseout',function(d){
          d3.select(this)
          .style("opacity",1)
        })
        .on("click",(lijst, function(d){
          createBar(d["Year"], countryLine)
        }))


     // g.selectAll("circle").data(data).enter()
     //   .append("circle")
     //    .attr("cx", function(d) { return x(d.date); })
     //    .attr("cy", function(d) { return y(d.value); })
     //    .attr("r", function(d, i) { return 5; })
     //    .attr("id", function(d) { return d.id; })
     //    .style("fill", "#fcb0b5")
     // function test(x){
     //   linegraph(x)
     // }


})
}
  //
  // var x = d3.scaleTime().rangeRound([0, w]);
  //
  // var y = d3.scaleLinear().rangeRound([h, 0]);

  // var line = d3.line()
  //   .x(function(d) { return x(d.date)})
  //   .y(function(d) { return y(d.value)})
  //   x.domain(d3.extent(data, function(d) { return d.date }));
  //   y.domain(d3.extent(data, function(d) { return d.value }));
