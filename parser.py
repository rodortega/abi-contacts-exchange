import csv
import json
from collections import defaultdict

import csv
from collections import defaultdict

def parse_csv_to_json(csv_file):
    equipment_data = defaultdict(lambda: defaultdict(lambda: {
        "type": None,
        "requirements": []
    }))

    with open(csv_file, newline='') as file:
        reader = csv.reader(file)

        # Skip the header
        next(reader)

        for row in reader:
            equipment_name = row[1]
            equipment_type = row[2]
            contact_name = row[8]
            item_name = row[4]
            item_quantity = int(row[5])
            equipment_quantity = int(row[3])

            # Store equipment type and item requirements
            equipment_data[equipment_name][contact_name]["type"] = equipment_type
            equipment_data[equipment_name][contact_name]["quantity"] = equipment_quantity
            equipment_data[equipment_name][contact_name]["requirements"].append({
                "item": item_name,
                "quantity": item_quantity
            })

    json_output = []
    for equipment, contacts in equipment_data.items():
        contacts_list = []
        for contact, details in contacts.items():
            contacts_list.append({
                "name": contact,
                "quantity": details["quantity"],
                "requirements": details["requirements"]
            })

        # Append equipment, type, and contacts to the output
        json_output.append({
            "equipment": equipment,
            "type": details["type"],
            "contacts": contacts_list
        })

    return json_output


def write_json(json_data, output_file):
    with open(output_file, 'w') as file:
        json.dump(json_data, file, indent=4)


csv_file = 'src/data/master.csv'

parsed_json = parse_csv_to_json(csv_file)

output_json_file = 'src/data/master.json'

write_json(parsed_json, output_json_file)

print(f'JSON data successfully written to {output_json_file}')
