# Name: Rutger Storm
# Student number: 12444049
# Nation converter for Linegraph

import csv
import json


year_dict = {}
country_dict = {}

# Opening the csv file, if the row is equal to column 'year', get in the if loop
# Years selected from 2000 till 2014, then year is the key, with another
# dictionary as value wherin nation the key is and the value is the value of
# total CO2 emission
with open('nation.1751_2014-1.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        year = (row["Year"])
        if (int(year)) >= 2000 and (int(year)) <= 2014:
            if (row["Year"]) in year_dict.keys():
                pass
            else:
                year_dict[(row["Year"])] = {}

            year_dict[(row["Year"])][row["Nation"]] = (row["Total CO2 emissions"])

# Writing the data to a json.file
fileName = 'data'
data = year_dict

with open('data_nation.json', 'w') as outfile:
    json.dump(data, outfile)
