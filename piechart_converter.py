import csv
import json


year_dict = {}


# Opening the csv file, if the row length is equal to 3 and contains 'KTOE'
# as element, the right data is found
with open('global-carbon-dioxide-emissions-by-sector-gg-co-1.csv') as csv_file:
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
    print(year_dict)
# Writing the data to a json.file
fileName = 'data'
data = year_dict

with open('data_piechart.json', 'w') as outfile:
    json.dump(data, outfile)
