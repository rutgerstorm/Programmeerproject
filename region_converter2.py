import csv
import json

region_list = ["Africa", "Centrally Planned Asia", "Centrally Planned Europe", "Developing America", "Far East", "Germany", "Middle East", "North America", "Oceania", "Western Europe"]
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
    # print(region_dict)

year_dict = {}
country_dict = {}

dict = {
    "Afghanistan": {
        2008: 123,
        2009: 123
    }
}

# Opening the csv file, if the row length is equal to 3 and contains "KTOE"
# as element, the right data is found
with open("nation.1751_2014-1.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        year = (row["Year"])
        if (int(year)) >= 2000 and (int(year)) <= 2010:
            if (row["Year"]) in year_dict.keys():
                pass
            else:
                year_dict[(row["Year"])] = region_dict
    # for x in csv_reader:
    #     print(x["nation"])
    #     print(x["Year"])
    #     print(x["Total CO2 emissions"])

        # for regio in year_dict[row["Year"]]:
        #     print(regio)
        #     for country in year_dict[x["year"][regio]]:
        #         if country == row[Country]:
        #             year_dict[x["year"][regio]["country"]] = row["total co2 emissions"]

        for region in region_list:
            # print(region)
            if (row["Year"]) in year_dict.keys():
                print(row["Year"])
                if region == key:
            #         if nation as value --> Then:
            #             year_dict[(row["Year"])][region][row["nation"]] = row["Total CO2 emissions"]



            # if year_dict[(row["Year"])][region][row["nation"]]:
            #     year_dict[(row["Year"])][region][row["nation"]] = row["Total CO2 emissions"]
    # print(year_dict)




    # for x in year_dict:
    #     for y in year_dict[x]:
    #         for z in year_dict[x][y]:
    #             print(x)
    #             print(y)
    #             print(z)
    #             print(year_dict[x][y][z] = )

    # for row in csv_reader:
    #     print("joe")
    #     for region in region_list:
    #         if year_dict[(row["Year"])][region][row["nation"]]:
    #             year_dict[(row["Year"])][region][row["nation"]] = row["Total CO2 emissions"]

            # print(year_dict)


        # print(year_dict)
