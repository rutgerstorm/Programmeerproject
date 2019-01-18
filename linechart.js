function makeLineChart(countryLine){

console.log(countryLine);
countryLine = countryLine.toUpperCase();
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
  obj["Value"] = data[year][countryLine]
  // console.log(data[year][countryLine]);

  lijst.push(obj)
}
console.log(lijst)

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
  var width = 750;
  var height = 400;


  var margin = {top: 50, right: 70, bottom: 50, left: 70}
  var width = 750 // Use the window's width
  var height = 400

  var xScale = d3.scaleLinear()
    .domain([0, 15]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number
  var yScale = d3.scaleLinear()
      .domain([0, 300]) // input
      .range([height - 30, 0])

  var xScaleData = d3.scaleLinear()
      .domain([1999, 2015]) // input
      .range([0, width])

  var yScaleData = d3.scaleLinear()
      .domain([45000, 52000]) // input
      .range([height, 0])

  var line = d3.line()
      .x(function(d) {return (xScaleData(d.Year))})
      // d3.max(d.Year, function(d) { return d; })
      .y(function(d) {return (yScaleData(d.Value))})


      // x.domain(d3.extent(, function(d) { return +d}));
      // y.domain(d3.extent(Object.values(countryDict), function(d) { return +d }));

  var svg = d3.select("body")
    .append("svg")
    .attr("width", width + 5)
    .attr("height", height + 5);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height - 20) + ")")
      .call(d3.axisBottom(xScale));

      svg.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(yScale));

    svg.append("path")
      .datum(lijst) // 10. Binds data to the line
      .attr("class", "line") // Assign a class for styling
      .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .attr("stroke-width", 3)
     .attr("d", line);



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
