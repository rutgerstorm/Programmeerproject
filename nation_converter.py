import csv
# import json

country = []
value = []
year = []
data_dict = {}

# Opening the csv file, if the row length is equal to 3 and contains 'KTOE'
# as element, the right data is found
with open('nation.1751_2014-1.csv') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        print(row)


        # if '20' in row["Year"]:
        #     print("YESSSSS")
        #     country.append(row['Nation'])

        # year.append((row["Year"])*10)
    # print(country)

#
# with open('paris-agreement-entry-into-force.csv') as csv_file:
#     csv_reader = csv.reader(csv_file)
#     for row in csv_reader:
#         if "Ratification" in row:
#             append 'yes' to country
#         elif "Acceptance" in row:
#             apppend 'yes' to country
#         elif "Approval" in row:
#             append 'yes' to country
#         else:
#             append 'no' to country



            # print(i)
            # if r== 2000:
                # year.append(row["Year"])
#             if row[5] == '2015':
#                 country.append(row[0].lstrip())
#                 value.append(row[6].lstrip())
#
# # Creating a dictionary with the right keys and values
# for i in range(len(value)):
#     data_dict[country[i]] = {"Energy Production": value[i]}
#
# # Writing the data to a json.file
# fileName = 'data'
# data = data_dict
#
# with open('data_energy.json', 'w') as outfile:
#     json.dump(data, outfile)
