

window.onload = function() {
  var worldmap = "world_countriesTest.json"
  var request = [d3.json(worldmap)];
  var color = d3.scaleOrdinal()
    .domain("Yes", "No")
    .range("blue", "red");




  // Transform datasets through transform functions
  Promise.all(request).then(function(response){
    // console.log(response[0].features);
    // var data = transformResponse(response[0]);
    // console.log(data)
// d3.json("data_agreement.json").then(function(data)
// {
//   for (var i = 0; i < 200; i++) {
//     console.log(i)
//   }
// })

// Variables for the svg
var w = 1750;
var h = 800;
var margin = 50;

var path = d3.geoPath();
// console.log(path);

var projection = d3.geoMercator()
                  .scale(180)
                  .translate( [w / 2, h / 1.5]);

var path = d3.geoPath().projection(projection);

var svg = d3.select("#Worldmap")
            .attr("width", w + 5)
            .attr("height", h + 5);



d3.json("data_agreement.json").then(function(data)
{
  // console.log(f.properties.name)
  response[0].features.forEach(function(f)
  {
    for (var i = 0; i < 200; i++)
    {
      // console.log(Object.keys(data)[i])
      // console.log(f.properties.name)
      if (f.properties.name.includes(Object.keys(data)[i]))
      {
        if ((Object.values(data)[i]) == "Yes")
        {
          f.properties["Paris"] = "Yes";
        }
        else
        {
          f.properties["Paris"] = "No";
        }
      }
    }
  })
})



// response[0].features.forEach(function(f){
//   // console.log(f.properties.name)
//   for (var i = 0; i < 200; i++) {
//     if (Object.keys((data)[i]).includes(f.properties.name)){
//     console.log(i)
//   }
//     }
//   })


  // if "Yes" in row
  //   f.properties["Paris"] = "Yes";
  // else
  //   f.properties["Paris"] = "No";
  //

  // if (f.properties["Paris"] = "Yes")
  // {
  //   var x = 'rgb(66, 134, 244)'
  // }
  // else
  // {
  //   x = 'rgb(244, 83, 65)'
  // }

  var body = d3.select("g")
  for (var i = 0; i < color.length; i++)



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
      // .style("fill", function(d) { return color(d); })
      .style("fill", "rgb(38, 38, 38)")
      .on("click", function(g){
        console.log(g.properties.name);
        makeLineChart(g.properties.name)
        createBar(2010, g.properties.name)

      })
      // .on("click", function(g){
      //   countryBarchart(g.properties.name)
      // })
      // .on("click", function(g){
      //   makeBarChart(g.properties.name)
      // })
      // .attr("fill", function(d) {
      //      if (f.properties["Paris"] = "Yes")
      //      {
      //        return {'rgb(66, 134, 244)'}
      //      }
      //      else {
      //        return {"blue"}
      //      }
      //      })
      // .attr("fill",
      //   if (f.properties["Paris"] = "Yes")
      // {
      //   return 'rgb(66, 134, 244)'
      // }
      // else
      // {
      //   return 'rgb(244, 83, 65)'
      // }

  //
  //     .attr("fill", function(d){
  //
  //   return "rgb(" + countryColor[d] + ")"
  // })



      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.25)
        .on('mouseover',function(d){
          // tip.show(d);

          d3.select(this)
            // .style("opacity", 0.8)
            .style('fill', 'rgb(51, 153, 102)')
            .style("stroke","white")
            .style("stroke-width",2);
        })
        .on('mouseout',function(d){
          // tip.show(d);

          d3.select(this)
            .style("fill", "rgb(38, 38, 38)")
            .style("stroke","white")
            .style("stroke-width",0.4);
        })
      })
    }
