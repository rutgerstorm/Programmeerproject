# Name: Rutger Storm
# Student number: 12444049
# Sector converter for Barchart
import csv
import json


year_dict = {}


# Opening the csv file, if the row is equal to column "year", get in the if loop
# Years selected from 2000 till 2014, then year is the key, with another
# dictionary as value. In this dictionary the country ("Entity") is the keys
# and a list of the different sector values is the value
with open("Data_files/global-carbon-dioxide-emissions-by-sector-gg-co-1.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        # print(row)
        year = (row["Year"])
        # print(year)
        if (int(year)) >= 2000 and (int(year)) <= 2010:
            if (row["Year"]) in year_dict.keys():
                pass
            else:
                year_dict[(row["Year"])] = {}

            year_dict[(row["Year"])][row["Entity"].upper()] = (row["Transport"]), row["Forestry"], row["Energy"], row["Other sources"], row["Agriculture, Land Use & Forestry"], row["Waste"], row["Residential & commercial"], row["Industry"], row["Agriculture"]

# Writing the data to a json.file
fileName = "data"
data = year_dict

with open("data_sectors.json", "w") as outfile:
    json.dump(data, outfile)
