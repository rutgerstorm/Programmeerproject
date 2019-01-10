import csv
import json

region_list = []
region_dict = {}


with open("region_indeling.txt", "r") as f:
    for line in f:
        if line == "\n":
            current_region = next(f).strip()
            region_dict[current_region] = {}
        elif "--" in line:
                continue
        else:
            country = line.split(" ")
            del country[0]
            region_dict[current_region][" ".join(country).strip()] = ""
    print(region_dict)

year_dict = {}
country_dict = {}

# Opening the csv file, if the row length is equal to 3 and contains 'KTOE'
# as element, the right data is found
with open('nation.1751_2014-1.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        year = (row["Year"])
        if (int(year)) >= 2000 and (int(year)) <= 2010:
            if (row["Year"]) in year_dict.keys():
                pass
            else:
                year_dict[(row["Year"])] = region_dict

        year_dict[(row["Year"])][region_dict][row["nation"]] = row["Total CO2 emissions"]
        print(year_dict)
