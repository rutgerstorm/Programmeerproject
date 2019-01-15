window.onload = function() {
  var worldmap = "world_countriesTest.json"
  var request = [d3.json(worldmap)];

  // Transform datasets through transform functions
  Promise.all(request).then(function(response){
    console.log(response[0].features);
    // var data = transformResponse(response[0]);
    // console.log(data)


// Variables for the svg
var w = 750;
var h = 400;
var barPadding = 2;
var margin = 50;

var path = d3.geoPath();
console.log(path);

var projection = d3.geoMercator()
                   .scale(130)
                  .translate( [w / 2, h / 1.5]);

var path = d3.geoPath().projection(projection);

var svg = d3.select("body")
            .append("svg")
            .attr("width", w + 5)
            .attr("height", h + 5);

response[0].features.forEach(function(f){
  console.log(f.properties.name);
  f.properties["Paris"] = "blue";
  console.log(f);
})

svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(response[0].features)
      .enter()
      .append("path")
      .attr("d", path)
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      .style("fill", function(d){
        return d.properties.Paris
      })
      // // tooltips
      //   .style("stroke","white")
      //   .style('stroke-width', 0.3)
      //   .on('mouseover',function(d){
      //     tip.show(d);
        //
        //   d3.select(this)
        //     .style("opacity", 1)
        //     .style("stroke","white")
        //     .style("stroke-width",3);
        // })
      })
      }
