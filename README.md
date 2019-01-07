# Programmeerproject
Description for project

> Rutger Storm  
> 12444049

## What are the differences between countries in CO2 emission and how are these built up?

On November 30th till December 12th 2015, the Climate Summit took place in Paris. The results were promising, 195 countries signed the “Agreement of Paris”. The Netherlands signed the agreement as well, which means they have to reduce their CO2-emission before 2030 with 49%. Almost all the countries will have to reduce their CO2-emission strongly in order to reach the agreement. But first things first, what does the actual CO2 in all the countries look like through different sectors?


1.	Interactive world map with the CO2 emission per country and a slider to change the year. 

![Figure 1](/Images/worldmap.png "Worldmap")


2.	Barchart which visualises the total emission per region. Divided in Africa, Developing America, Centrally planned Asia,             Centrally planned Europe, Far East, Middle East, North America, Oceania & Western Europe. The barchart below contains different regions but the unit on the x-axis is in years and the barchart is more like a stacked chart rather than a barchart. In my barchart, every region has it's own bar (x-axis) and the y-axis shows the amount of CO2 emission. 

![Figure 1](/Images/barchart.png "Barchart")

3.	Circle diagram for every country which visualises the share of each production sector in the nationaal CO2 emission. My pie chart contains the following sectors: Transport,Forestry,Energy,Other sources,"Agriculture, Land Use & Forestry",Waste,Residential & commercial,Industry & Agriculture.

![Figure 1](/Images/circlediagram.png =250x250)
---

## Sketch  
The website contains of two tabs, the first tab is the homepage which tells you the story about the Paris Agreement and gives the references. As is shown in the sketches below. When the users clicks on a random country, the barchart will zoom in to the region in which region this country belongs and shows how this region is built up. At the same time the piechart shows how the total emission of this random country is divided in the different sectors. When the users clicks on another country inside a region, the piechart shows the total emission divided in the different sectors of this country.  

![Figure 1](/Images/homepage.png "Homepage")
![Figure 1](/Images/visualization.png "Visualization")

---

### Prerequisites
Data Sources  
> [Emission by region](https://cdiac.ess-dive.lbl.gov/trends/emis/tre_regional.html)  
> [Emission by nation](https://cdiac.ess-dive.lbl.gov/trends/emis/tre_coun.html)  
> [Emission by Sector](https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions#emissions-by-sector)  



### External Components  
D3 Library, another libraries might follow


### Similar  
There is no visualization that uses all three subjects that I got


### Challenges  
It will be hard to parse through all the given data, it is data from every country, for different sectors for a period of almost 30 years. But after a long time of searching data, I've found all the data needed for the visualizations I wanted.
















