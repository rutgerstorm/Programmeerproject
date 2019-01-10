import csv
import json


year_dict = {}
region_dict = {}

# Opening the csv file, if the row length is equal to 3 and contains 'KTOE'
# as element, the right data is found
with open('region.1751_2014-2.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        year = (row["Year"])
        if (int(year)) >= 2000 and (int(year)) <= 2010:
            if (row["Year"]) in year_dict.keys():
                pass
            else:
                year_dict[(row["Year"])] = {}

            year_dict[(row["Year"])][row["Region"]] = row["Total CO2 emissions"]

# Writing the data to a json.file
fileName = 'data'
data = year_dict

with open('data_region1.json', 'w') as outfile:
    json.dump(data, outfile)
