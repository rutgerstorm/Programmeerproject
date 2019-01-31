## Final report Programmeerproject

## Description

My webpage contains a worldmap which shows, which countries signed the Paris Agreement. The user can hoover over every country and when the users clicks on a country the following happens. A linegraph is shown, which shows the total CO2 emission of this country from 2000 till 2014. The user can click on a year in this linegraph, then a barchart is shown. The barchart visualizes how the CO2 of this country in this year is divided through different sectors.

<img src="docs/overallss.jpg" width="500">

## Technical Design  
My webpage contains two pages, a homepage and a visualization page. Therefore I've used two html files, index.html for the homepage and visualization.html for the visualization page. Layout for these pages is done in a general css file, called programeerproject.css. The visualization page contains three different visualizations, a worldmap, a linegraph and a barchart. For every visualization, a seperate Javascript file is used. Called worldmap.js, linegraph.js and barchart.js. To convert the data to usuable json files, 3 python files are used, nation_converter.py, sector_converter.py and paris_agreement_converter.py.

### Worldmap
The worldmap.js contains 2 functions called 'createCountryTitle' and 'createYearTitle'. These functions function are invoked when the users clicks on a country. The country and year on which is clicked is shown. The variable tooltip, is used the shows the tooltip in the upper right corner, so the user can see over which country they hoover. The function dataParis links the data about the Paris Agreement to the countries, Yes if they signed the agreement, No if they haven't. The function worldmapLayout, is used to layout the worldmap. For example, the colours of the countries, the hoover function and the on click. This onclick functions calls in four different functions. 'makeLineChart', 'createBar', 'createCountryTitle' and 'createYearTitle'. The createCountryTitle and createYearTitle are described above, the other will be described in the following sections. 

### Linegraph  
The first function in the linegraph Javascript file, is the dropDown function. This function gives the name of the country chosen from the dropdown, to the makeLineChart function. The makeLineChart can have 2 inputs, the dropdown and the onclick from the worldmap. When the input is made the following happens, the json file containing all the information from the countries, is opened. Then through a for- and if loop, it is checked if there's any data available for this country, if not the createCountryTitle prints: "No data Available". If there is data available the data is formatted and stored in a list called "dataList". The function textUnits gives the graph a title and axis units. The scatter is an important part of the linegraph, the scatter makes use of the x and y from the linegraph function. Then a scatter is plotted over the linegraph. This scatter contains an onclick which calls in the createBar function. By this way the lingegraph is linked to the barchart. 

### Barchart  
The barchart Javascript file starts with a 'sliderPresent = true' (later more on this). The createBar function is the first function in this file, it gets input from the worldmap or the linegraph(scatter). The input contains of two elements, a year and a country. This year(x) and country(y) are used to search the right data from the data_sectors.json file. The data from country y and year x. The right data is now stored in a variable called 'data'. Then the next function comes by, makeBar, concerning the total barchart file. The svg element was already present but had no width nor height. So this is done first, thereby some general elements for the barchart are added. For example the units for the axis and the title. Then there is an if loop with the variable sliderPresent we've seen earlier. The sliderPresent is true, so it get's in the if loop and they it's immediatly turned to false. This prevents the slider from appending itself more than once. The function barchart is the one creating the bar.  



