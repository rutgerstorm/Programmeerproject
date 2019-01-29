window.country = "Canada";
window.onload = function() {
  var worldmap = "world_countriesTest.json"
  var request = [d3.json(worldmap), d3.json("data_agreement.json")];






  // Transform datasets through transform functions
  Promise.all(request).then(function(response){


// Variables for the svg
var w = 1600;
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



// d3.json("data_agreement.json").then(function(data)
// {
  // console.log(f.properties.name)
  response[0].features.forEach(function(f)
  {
    for (var i = 0; i < 200; i++)
    {
      // console.log(Object.keys(data)[i])
      // console.log(f.properties.name)
      if (f.properties.name.includes(Object.keys(response[1])[i]))
      {
        if ((Object.values(response[1])[i]) == "Yes")
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

function createTitle(country){
  svg.append("text")
          .attr("x",1200)
          .attr("y", 770)
          .attr("id", "Title")
          .style("text-anchor", "end")
          .style("font-family", "Sans-serif")
          .style("font-size", "35px")
          .style("Opacity", 0.6)
  svg.select("#Title")
    .transition()
      .duration(1000)
      .text(country,+ ",")

}
createTitle()

function createYear(year){
  svg.append("text")
          .attr("x",1290)
          .attr("y", 770)
          .attr("id", "Year")
          .style("text-anchor", "end")
          .style("font-family", "Hervetica")
          .style("font-family", "Sans-serif")
          .style("font-size", "35px")
          .style("Opacity", 0.6)
  svg.select("#Year")
    .transition()
      .duration(1000)
      .text(year)

}
createYear()
//


svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(response[0].features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", function(d){
        if (d.properties["Paris"] == "No"){
          x = "rgb(204, 51, 51)"
          return x;
        }

        else if  (d.properties["Paris"] == "Yes"){
          y = "rgb(57, 172, 115)"
        return y;
      } else {
        return "black";
      }
    })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",1)
      // .style("fill", function(d) { return color(d); })
      // .style("fill", "rgb(38, 38, 38)")
      .on("click", function(g){
        window.country = g.properties.name;
        console.log(g.properties.name);
        makeLineChart(g.properties.name);
        createBar(2010, g.properties.name);
        createTitle(g.properties.name);
        createYear(2010);
        // slider(2010, g.properties.name);
      })


      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.25)
        .on('mouseover',function(d){
          // tip.show(d);

          d3.select(this)
            .style("opacity", 0.6)
            // .style('fill', "rgb(255, 255, 255)")
            .style("stroke","white")
            .style("stroke-width",2);
        })
        .on('mouseout',function(d){
          // tip.show(d);

          d3.select(this)
          .style("opacity", 1)
          //   .attr("fill", function(d){
          //     console.log(d.properties.Paris);
          //     if (d.properties.Paris == "No"){
          //       x = "rgb(204, 0, 0)"
          //       return x;
          //     }
          //
          //     else if  (d.properties["Paris"] == "Yes"){
          //       y = "rgb(0, 102, 102)"
          //     return y;
          //   } else {
          //     return "black";
          //   }
          // })
            .style("stroke","white")
            .style("stroke-width",0.4);

        })
        // function createLegend() {
        //   legend = svg.selectAll(".legend")
        //          .data(color)
        //          .enter()
        //          .append("g")
        //          .attr("class" , "legend")
        //          .attr("transform", function(d, i) {
        //            return "translate(0," + i * 20 + ")";
        //          })
        //
        //     legend.append('rect')
        //       .attr("x", 430)
        //       .attr("y", 220)
        //       .attr("width", 10)
        //       .attr("height", 10)
        //       .attr("fill", function(d, i){
        //         return "blue"
        //       });
        //
        //     legend.append("text")
        //       .attr("x", 450)
        //       .attr("y", 500)
        //       .text(function(d){
        //         return d;
        //       })
        // }
        // createLegend()


      })
    }
