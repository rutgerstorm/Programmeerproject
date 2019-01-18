window.onload = function() {

//
  d3.json("data_nation.json").then(function(data) {
    console.log(data);
    makeWorldmap(data);
    })

}
