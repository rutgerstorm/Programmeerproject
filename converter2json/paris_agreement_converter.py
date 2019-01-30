# Name: Rutger Storm
# Student number: 12444049
# Paris Agreement

import csv
import json


country_dict = {}

# Opening the csv file, if "Ratification", "Acceptance" or "Approval" is in the
# row of the country, it means this country signed the agreement
with open("Data_files/paris-agreement-entry-into-force.csv") as csv_file:
    csv_reader = csv.reader(csv_file)
    for row in csv_reader:
        if "Ratification" in row:
            country_dict[row[1]] = "Yes"
        elif "Acceptance" in row:
            country_dict[row[1]] = "Yes"
        elif "Approval" in row:
            country_dict[row[1]] = "Yes"
        else:
            country_dict[row[1]] = "No"


# Writing the data to a json.file
fileName = 'data'
data = country_dict

with open('data_agreement.json', 'w') as outfile:
    json.dump(data, outfile)
