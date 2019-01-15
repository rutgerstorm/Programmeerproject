/*
Rutger Storm
12444049
*/


// function loadingData(){
// d3.json("data_piechart.json").then(function(data)
// {
// console.log(data)
// })
//
// }
// loadingData()

// // Updating the piechart data when clicked on country
// function update(pieData, male, female) {
//   var pieData = [{gender: "Men", number:male}, {gender: "Women", number:female}]
//   var data = d3.pie().sort(null).value(function(d){return d.number;})(pieData);
//
// // Adjusting the circle in the piechart
// var segments = d3.arc()
//                     .innerRadius(50)
//                     .outerRadius(200)
//                     .padAngle(0.01)
//                     .padRadius(150);
//
// // Animation for the updated piechart
// const path = d3.select(".pie").selectAll("path")
//                   .data(data)
//                   .transition()
//                   .duration(200)
//                   .attr("d", segments)
//
// }
