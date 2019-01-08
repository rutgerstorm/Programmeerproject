For the visualizations I'm planning to create, the following data is needed. A list of the CO2 emission per country, a list of the CO2 emission per region and a list of the CO2 emission per country, per sector. Thereby data is needed which tells us if a country signed the Paris agreement or not.
The following links contain all the data needed.

Data Sources  
> [Emission by region](https://cdiac.ess-dive.lbl.gov/trends/emis/tre_regional.html)  
> [Emission by nation](https://cdiac.ess-dive.lbl.gov/trends/emis/tre_coun.html)  
> [Emission by Sector](https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions#emissions-by-sector) 
> [Parties of the Paris Agreement](http://paris-agreement-entry-into-force.openclimatedata.net/)  

The data is stored as csv and has to be parsed and then converted to a json file. The data can be filtered on base of country name and year. In the 'Parties of the Paris Agreement' dataset, every country who signed the Paris agreement has the concept "Ratification", "Approval" or "Acceptance" in its row. For the worldmap a dictionary will be used with the Countryname as key,
