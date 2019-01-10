/*
Rutger Storm
12444049
*/

function loadingData(){
d3.json("data_nation.json").then(function(data)
{
console.log(data)
})

d3.json("data_region1.json").then(function(data)
{
console.log(data)
})
d3.json("data_piechart.json").then(function(data)
{
console.log(data)
})
d3.json("data_agreement.json").then(function(data)
{
console.log(data)
})
}
loadingData()
