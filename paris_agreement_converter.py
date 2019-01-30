import csv
import json


country_dict = {}

# Opening the csv file, if the row length is equal to 3 and contains 'KTOE'
# as element, the right data is found
with open("Data files"/'paris-agreement-entry-into-force.csv') as csv_file:
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
