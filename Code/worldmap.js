/*
Rutger Storm
12444049
Programmeerproject
Worldmap
*/

// General variable country which can function through different files
window.country = "Canada";
// Window onload function, covers the total file
window.onload = function() {
  var worldmap = "Json_files/world_countriesTest.json"
  var request = [d3.json(worldmap), d3.json("Json_files/data_agreement.json")];

  // Transform datasets through transform functions
  Promise.all(request).then(function(response){

// Variables for the svg
var w = 1000;
var h = 600;
var margin = 50;

var path = d3.geoPath();

// Projecting and scaling the worldmap
var projection = d3.geoMercator()
                  .scale(140)
                  .translate( [w / 2, h / 1.5]);

var path = d3.geoPath().projection(projection);

var svg = d3.select("#Worldmap")
            .attr("width", w + 5)
            .attr("height", h + 5);

var tooltip = svg.append("text")
  .attr("id", "tooltip")
  .attr("x", 900)
  .attr("y", 20)
  .attr("class", "tooltip")
  .style("text-anchor", "end")
  .style("font-family", "Sans-serif")
  .style("font-size", "27px")
  .style("Opacity", 0.6)

  // Appending the data for the Paris Agreement to the countries
  function dataParis(){
  response[0].features.forEach(function(f)
  {
    // Looping through all the countries
    for (var i = 0; i < 200; i++)
    {
      if (f.properties.name.includes(Object.keys(response[1])[i]))
      {
        /*
        Give the country a Yes if the country did signed the Paris agreement
        and vice versa
        */
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
}
dataParis()

/* When the users clicks on a country, the name from which country the data
is shown, appears
*/
function createCountryTitle(country){
  svg.append("text")
          .attr("x",640)
          .attr("y", 550)
          .attr("id", "Title")
          .style("text-anchor", "end")
          .style("font-family", "Sans-serif")
          .style("font-size", "27px")
          .style("Opacity", 0.6)
  svg.select("#Title")
    .transition()
      .duration(1000)
      .text(country,+ ",")

}
createCountryTitle()

/* When the users clicks on a country, the data for the recent year avaiable
appears and this year is shown
*/
function createYearTitle(year){
  svg.append("text")
          .attr("x",730)
          .attr("y", 550)
          .attr("id", "Year")
          .style("text-anchor", "end")
          .style("font-family", "Hervetica")
          .style("font-family", "Sans-serif")
          .style("font-size", "27px")
          .style("Opacity", 0.6)
  svg.select("#Year")
    .transition()
      .duration(1000)
      .text(year)

}
createYearTitle()

function worldmapLayout(){
svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(response[0].features)
      .enter()
      .append("path")
      .attr("d", path)
      // Fill the country based on the Paris Agreement
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
      .style("stroke", "white")
      .style("stroke-width", 1.5)
      .style("opacity",1)

      /*
      If the users clicks on a country, the following functions are invoked
      */
      .on("click", function(g){
        window.country = g.properties.name;
        makeLineChart(g.properties.name);
        createBar(2010, g.properties.name);
        createCountryTitle(g.properties.name);
        createYearTitle(2010);
      })


        // Tooltips and styling for the worldmap
        .style("stroke","white")
        .style("stroke-width", 0.25)
        .on("mouseover",function(d){
          tooltip
          .style("display", "true")
          .text(d.properties.name)

          d3.select(this)
            .style("opacity", 0.6)
            .style("stroke","white")
            .style("stroke-width",2);
        })

        .on("mouseout",function(d){
          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",0.4);

        })
      }
      worldmapLayout()
      })
    }
