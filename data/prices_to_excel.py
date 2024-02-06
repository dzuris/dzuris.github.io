import os
from pathlib import Path
import json
import pandas as pd

data = {}

def create_excel_file(brand, subcategory, jsonData):
    # Create a DataFrame from the JSON data
    df = pd.DataFrame.from_dict(jsonData, orient='index')

    # Set the index name to 'ProductName'
    df.index.name = 'ProductName'

    # Create the Excel writer
    excel_filename = f"{brand}-service-prices.xlsx"
    writer = pd.ExcelWriter(excel_filename, engine='openpyxl')

    # Write the DataFrame to the Excel file
    df.to_excel(writer, sheet_name=subcategory, index=True)

    # Save the Excel file
    writer.save()

    print(f"Excel file '{excel_filename}' created successfully!")

def has_json_extension(file_path):
    path = Path(file_path)
    return path.suffix.lower() == '.json'

def process_json_file(brand, subcategory, model, json_path):
    try:
        with open(json_path, encoding='utf-8') as file:
            jsonData = json.load(file)
        # Process jsonData as needed
    except UnicodeDecodeError as e:
        print(f"Error decoding file: {e}")
        # Handle the error (e.g., log, raise, or provide a default value)
        
    for item_key, item_value in jsonData.items():
        if "price" in item_value:
            price = item_value["price"]
            # data[brand][subcategory][model][item_key] = price
            # data[brand] = {}
            if subcategory is None:
                # print(f'Brand: {brand}, Model: {model}, Item key: {item_key}, Price = {price}')
                # print(data[brand].keys())
                data[brand][model][item_key] = price
                # data[brand][model] = json.dumps({item_key: price})
            else:
                data[brand][subcategory][model][item_key] = price
            # print(f"Brand = {brand}, Subcategory = {subcategory}, Model = {model}, Item {item_key}: Price = {price}")


def process_dir(brand, subcategory, dir_path):
    for item in os.listdir(dir_path):
        if subcategory is None and has_json_extension(item):
            data[brand][item[:-5]] = {}
            process_json_file(brand, None, item[:-5], os.path.join(dir_path, item))
        elif has_json_extension(item):
            data[brand][subcategory][item[:-5]] = {}
            process_json_file(brand, subcategory, item[:-5], os.path.join(dir_path, item))
        else:
            data[brand][item] = {}
            process_dir(brand, item, os.path.join(dir_path, item))


def process_all_brands(data):
    for brand, brand_data in data.items():
        print(f"Brand: {brand}")
        if brand == 'iphone':
            create_excel_file(brand, None, data[brand])
        else:
            for subcategory, subcategory_data in brand_data.items():
                create_excel_file(brand, subcategory, data[brand])
        #     for model, model_data in subcategory_data.items():
        #         for item_key, item_value in model_data.items():
        #             if "price" in item_value:
        #                 price = item_value["price"]
        #                 print(f"\t\tModel: {model}, Item {item_key}: Price = {price}")


# Get the path to the directory containing the current script
script_directory = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the "service-items" directory
service_items_directory = os.path.join(script_directory, "service-items")

# List all files and subdirectories in the "service-items" directory
for brand in os.listdir(service_items_directory):
    data[brand] = {}
    process_dir(brand, None, os.path.join(service_items_directory, brand))

process_all_brands(data)

print(data)