/*
Rutger Storm
12444049
Programmeerproject
Barchart
*/

sliderPresent = true;
// All the sector through which the bars are divided
sectors = ["Transport", "Forestry","Energy","Other sources","Agriculture, Land Use & Forestry","Waste","Residential & commercial","Industry","Agriculture"]
/*
The country on which is clicked comes in, the first year is always set at 2010
*/
function createBar(year, country){
d3.select("#Year")
.transition()
.text(year)

/*
Turning the country name to uppercase, because the all the countries in the
sector json file are uppercase
*/
var country = country.toUpperCase();

// Reading in the json file and preparing the data
d3.json("data_sectors.json").then(function(dataBar){

  data = (dataBar[year][country]).map(Math.abs)
  makeBar()

// Determining the minimum and maximum value of the data
min = d3.min(data, function(d){return d;  })
max = d3.max(data, function(d){return d;  })



function makeBar(){
  //Width and height from the SVG
  var w = 500;
  var h = 400;
  var barPadding = 2;
  var margin = 30

  var svg = d3.select("#Barchart")
    .attr("width", w + 5)
    .attr("height", h + 5);


    var div = svg.append("text")
      .attr("id", "div")
      .style("opacity", 0.7)
      .attr("x", 800)
      .attr("y", 50)
      .attr("class", "div")

    // Append the title of the linegraph
    svg.append("text")
          .attr("id", "graphTitle")
          .attr("transform", "translate(490, 15)")
          .style("text-anchor", "end")
          .style("font-family", "sans-serif")
          .style("font-size", "12px")

    // Units for x-axis
    svg.append("text")
          .attr("id", "xAxisUnit")
          .attr("transform", "translate(630, 410)")
          .style("text-anchor", "end")
          .style("font-family", "sans-serif")
          .style("font-size", "11px")

    // Units for y-axis
    svg.append("text")
            .attr("id", "yAxisUnit")
            .attr("x",-335)
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end")
            .style("font-family", "sans-serif")
            .style("font-size", "13px")

  // Update the title of the linegraph
  svg.select("#graphTitle")
    .transition()
    .duration(1000)
      .text("Total CO2 emission per sector");

  // Update the units for the x-axis
  svg.select("#xAxisUnit")
    .transition()
    .duration(1000)
      .text("Sector");

  // Update the units for the x-axis
  svg.select("#yAxisUnit")
    .transition()
    .duration(1000)
      .text("1000 Tons");



    var dataTime = d3.range(0, 11).map(function(d) {
      return new Date(2000 + d, 11, 3);
    });

    /*
    Turn the sliderPresent to false so the slider is appended only one time
    the slider again
    */
    if (sliderPresent){
      sliderPresent = false
      var sliderTime = d3
        .sliderBottom()
        .min(d3.min(dataTime))
        .max(d3.max(dataTime))
        .step(1000 * 60 * 60 * 24 * 365)
        .width(300)
        .tickFormat(d3.timeFormat('%Y'))
        .tickValues(dataTime)
        .default(new Date(1998, 10, 3))
        .on('onchange', val => {
          d3.select('p#value-time');
          var sliderYear = (d3.timeFormat('%Y')(val));
          createBar(sliderYear, window.country);
          // createYear(sliderYear);
        });

      var gTime = d3
        .select('div#slider-time')
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .attr("id", "textYear")
        .append('g')
        .attr('transform', 'translate(180,30)');

      gTime.call(sliderTime);


    }

  // Adjusting the xScale
  var xScale = d3.scaleBand()
    .domain(["Transport", "Forestry","Energy","Other sources","Agriculture, Land Use & Forestry","Waste","Residential & commercial","Industry","Agriculture"])
    .range([margin, (w - margin)]);

  // Adjusting the yScale
  var yScale = d3.scaleLinear()
         .domain([d3.min(data, function(d){return d;  }), d3.max(data, function(d){return d;  })])
         .range([h - margin, margin]);

  function barchart(){
  var bar = svg.selectAll("rect")
            .data(data);
      bar.enter()
      .append("rect")
      .attr("x", function(d, i) { return xScale(sectors[i]) + (1.3*margin); })

      .on('mouseover',function(d){
        div
        .attr("x",80)
        .attr("y", 15)
        .style("font-size", "12px")
        .attr("font-family", "Helvetica")
        .style("display", "true")
        .text(d);
        d3.select(this)
          .style("fill", "rgb(255, 170, 0)")
       })

     .on('mouseout',function(d){
       d3.select(this)
         .style("fill", function(d) {
          return "rgb(0, 0, " + (d / 1000) + ")"
      })
      })
      .merge(bar)
        .transition()
        .duration(1000)
        .attr("y", function(d) {
        return yScale(d) + (0.5 * margin) - 25;
        })
        .attr("width", (w - margin) / (15))
        .attr("height", function(d) {
          return h - (margin) - yScale(d);
         })
       .attr("fill", function(d) {
         return "rgb(0, 0, " + (d / 1000) + ")"
       })
}
barchart()
     function createAxis(){
      // Create the y axis
      var yAxis = svg.append('g')
          .attr("class", "yAxis")
          .style("font-family", "sans-serif")
          .style("font-size", "8px")
          .attr("transform", "translate(60,-10)")
          // .call(d3.axisLeft(yScale));

      // Create the x axis
      var xAxis = svg.append('g')
          .attr("class", "xAxis")
          .style("font-family", "sans-serif")
          .style("font-size", "7px")
          .attr("transform", "translate(30,360)")

          // Update the y-axis
          svg.select(".yAxis")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(yScale));

          // Update the x-axis
          svg.select(".xAxis")
            .transition()
            .duration(1000)
            .call(d3.axisBottom(xScale));
    }
    createAxis()
   }

 })
}
