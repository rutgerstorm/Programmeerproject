import csv
import json

country = []
value = []
year = set()
year_dict = {}
country_dict = {}

# Opening the csv file, if the row length is equal to 3 and contains 'KTOE'
# as element, the right data is found
with open('nation.1751_2014-1.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        test = (row["Year"])
        if (int(test)) >= 2000 and (int(test)) <= 2010:
            if (row["Year"]) in year_dict.keys():
                pass
            else:
                year_dict[(row["Year"])] = {}

            year_dict[(row["Year"])][row["Nation"]] = row["Total CO2 emissions"]

# Writing the data to a json.file
fileName = 'data'
data = year_dict

with open('data_nation.json', 'w') as outfile:
    json.dump(data, outfile)
