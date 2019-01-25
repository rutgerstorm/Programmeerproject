function dropdown(k){
  makeLineChart(k);
}

function makeLineChart(countryLine){


var countryLine = countryLine.toUpperCase();
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
  if (!isNaN(+data[year][countryLine])){
  obj = {}

  obj["Year"] = year;
  obj["Value"] = (+data[year][countryLine])*3,667
  console.log(obj["Value"]);

  lijst.push(obj)
}
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
    .attr("width", width + 5)
    .attr("height", height + 5);
    // .selectAll("path")
    // .selectAll("g")
    // .selectAll("circle")
    // .data(lijst);
  var div = d3.select("body")
      .append("div")
      .style("display", "true")
      .attr("class", "tooltip")
      .style("opacity", 1)
      .style("font-size", "11px")
      .style("font-family", "sans-serif");

  svg.append("text")
        .attr("transform", "translate(450, 25)")
        .style("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "17px")
        .text("CO2 emission in Thousand Metric Tons (1000 Ton)");

  svg.append("text")
        .attr("transform", "translate(600, 390)")
        .style("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "13px")
        .text("Year");

  svg.append("text")
          .attr("x",-340)
          .attr("y", 20)
          .attr("transform", "rotate(-90)")
          .style("text-anchor", "end")
          .style("font-family", "sans-serif")
          .style("font-size", "13px")
          .text("Value in Thousand")
          .text("1000 Tons");


    svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", "translate(-30," + (height - 50) + ")")
      // .call(d3.axisBottom(xScaleData));

      svg.append("g")
          .attr("class", "yAxis")
          .attr("transform", "translate(45,0)")
          // .call(d3.axisLeft(yScaleData));

// linegraph = function(country){
    svg.append("path")
      // .datum(lijst)
      .attr("class", "line")
      .attr("fill", "none")
     .attr("stroke", "rgb(102, 140, 255)")
     .attr("stroke-linejoin", "round")
     .attr("stroke-linecap", "round")
     .attr("stroke-width", 3)
     .attr("id", "line")
     // .attr("d", line);

  svg.select("#line")
    .datum(lijst)
    .transition()
      .duration(1000)
      .attr("d", line);

  svg.select(".yAxis")
    .transition()
    .duration(1000)
    .call(d3.axisLeft(yScaleData));

    svg.select(".xAxis")
      .transition()
      .duration(1000)
      .call(d3.axisBottom(xScaleData));

      console.log(lijst);

     var scatter = svg.selectAll("circle")
                    .data(lijst);

        scatter.enter()
        .append("circle")
        .attr("r", 5)
        .attr("class", countryLine)
        .on('mouseover',function(d){
          div.html(d)
          .style("display", "inline")
          .style("display", "true")
          .style('left', (d3.eventPageX - 100)+ 'px')
          .style('top', (d3.eventPageY - 500)+ 'px')
          .text((d.Value));
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
        }))





        .merge(scatter)
        .transition()
        .duration(1500)
        .attr("class", countryLine)
        .attr("cx", (lijst, function(d)
        {return xScaleData(d["Year"]) - 8  }))
        .attr("cy", (lijst, function(d)
        { console.log(d);
          return (yScaleData(d["Value"]))}))
        .on("click",(function(d){
          createBar(d["Year"], countryLine)
        }))

        scatter.exit().remove();

        // scatter.transition()        .attr("cx", (lijst, function(d)
        //         {return xScaleData(d["Year"]);  }))
        //         .attr("cy", (lijst, function(d)
        //         {return (yScaleData(d["Value"]))}))
        //         .on("click",(function(d){
        //   console.log(d);
        //   console.log(countryLine);
        //   createBar(d["Year"], countryLine)
        // }))



        //
        // svg.selectAll("circle")
        //    .data(lijst)
        //    .enter()
        //    .append("circle")
        //    .attr("cx", (lijst, function(d)
        //    {return xScaleData(d["Year"]);  }))
        //    .attr("cy", (lijst, function(d)
        //    {return (yScaleData(d["Value"]))}))
        //    .attr("r", 5)
        //    .on('mouseover',function(d){
        //      d3.select(this)
        //        .style("opacity",0.4)
        //        .text(function(d, i) { return d["Value"]; })
        //    })
        //    .on('mouseout',function(d){
        //      d3.select(this)
        //      .style("opacity",1)
        //    })
        //    .on("click",(lijst, function(d){
        //      createBar(d["Year"], countryLine)
        //    }))



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
