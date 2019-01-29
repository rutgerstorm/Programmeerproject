// function countryBarchart(countryBar){
sliderPresent = true;
sectors = ["Transport", "Forestry","Energy","Other sources","Agriculture, Land Use & Forestry","Waste","Residential & commercial","Industry","Agriculture"]
function createBar(year, country){
console.log(year)
d3.select("#Year")
.transition()
.text(year)

country = country.toUpperCase();
// country = country.charAt(0).toUpperCase() + country.slice(1)
console.log(country)
// console.log(countryBar);
var dataDict = {}
// var years = []

d3.json("data_piechart.json").then(function(dataBar){

  data = (dataBar[year][country]).map(Math.abs)
  makeBar()




min = d3.min(data, function(d){return d;  })
max = d3.max(data, function(d){return d;  })
// console.log(min)
// console.log(max)


function makeBar(){
  //Width and height from the SVG
  var w = 750;
  var h = 420;
  var barPadding = 2;
  var margin = 30




  var svg = d3.select("#Barchart")
    .attr("width", w + 5)
    .attr("height", h + 5);


    var div = svg.append("text")
      .attr("id", "tooltip")
      .style("opacity", 0.7)
      .attr("x", 800)
      .attr("y", 50)
      .attr("class", "tooltip")

    svg.append("text")
          .attr("id", "graphTitle")
          .attr("transform", "translate(530, 15)")
          .style("text-anchor", "end")
          .style("font-family", "sans-serif")
          .style("font-size", "17px")

    svg.append("text")
          .attr("id", "xAxisUnit")
          .attr("transform", "translate(630, 410)")
          .style("text-anchor", "end")
          .style("font-family", "sans-serif")
          .style("font-size", "11px")


    svg.append("text")
            .attr("id", "yAxisUnit")
            .attr("x",-335)
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end")
            .style("font-family", "sans-serif")
            .style("font-size", "13px")

  svg.select("#graphTitle")
    .transition()
    .duration(1000)
      .text("Total CO2 emission per sector");

  svg.select("#xAxisUnit")
    .transition()
    .duration(1000)
      .text("Sector");

  svg.select("#yAxisUnit")
    .transition()
    .duration(1000)
      .text("1000 Tons");



    var dataTime = d3.range(0, 11).map(function(d) {
      return new Date(2000 + d, 11, 3);
    });





    if (sliderPresent){
      sliderPresent = false
// function slider(year, country){
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
  // }
  // slider()

  // Adjusting the xScale
  var xScale = d3.scaleBand()
    .domain(["Transport", "Forestry","Energy","Other sources","Agriculture, Land Use & Forestry","Waste","Residential & commercial","Industry","Agriculture"])
    .range([margin, (w - (1.8*margin))]);

  // Adjusting the yScale
  var yScale = d3.scaleLinear()
         .domain([d3.min(data, function(d){return d;  }), d3.max(data, function(d){return d;  })])
         .range([h - margin, margin]);
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
  // console.log(data);
  var bar = svg.selectAll("rect")
            .data(data);
      bar.enter()
      .append("rect")
      .attr("x", function(d, i) { return xScale(sectors[i]) + (1.5 *margin); })

      .on('mouseover',function(d){
        div
        .attr("x",80)
        .attr("y", 15)
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
          .attr("transform", "translate(30,380)")
          // .call(d3.axisBottom(xScale));

          svg.select(".yAxis")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(yScale));

            svg.select(".xAxis")
              .transition()
              .duration(1000)
              .call(d3.axisBottom(xScale));
    }
    createAxis()
   }

 })
}
