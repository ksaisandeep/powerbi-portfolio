import pandas as pd
import json
import numpy as np
from datetime import datetime, timedelta

# Read the CSV
print("Reading CSV file...")
df = pd.read_csv('/home/ubuntu/upload/quick_commerce_data_raw.csv')

# Clean column names
df.columns = df.columns.str.strip()

print(f"Total records: {len(df)}")

# Sample only 10k records for smaller file size
if len(df) > 10000:
    df = df.sample(n=10000, random_state=42)
    print(f"Sampled to 10k records")

# Create Order_Date column if it doesn't exist
if 'Order_Date' not in df.columns:
    start_date = datetime(2024, 4, 19)
    dates = [start_date + timedelta(days=int(i % 400)) for i in range(len(df))]
    df['Order_Date'] = dates

# Add missing columns
if 'Order_Month' not in df.columns:
    df['Order_Month'] = pd.to_datetime(df['Order_Date']).dt.strftime('%Y-%m')
    
if 'Age_Group' not in df.columns:
    df['Age_Group'] = pd.cut(df['Customer_Age'], bins=[0, 18, 25, 35, 45, 55, 100], 
                              labels=['<18', '18-25', '26-35', '36-45', '46-55', '55+'], ordered=False)
    df['Age_Group'] = df['Age_Group'].astype(str)

if 'Delivery_Speed' not in df.columns:
    df['Delivery_Speed'] = pd.cut(df['Delivery_Time_Min'], bins=[0, 15, 30, 45, 60, 1000],
                                   labels=['Ultra Fast', 'Fast', 'Normal', 'Slow', 'Very Slow'], ordered=False)
    df['Delivery_Speed'] = df['Delivery_Speed'].astype(str)

if 'Customer_Rating_Category' not in df.columns:
    df['Customer_Rating_Category'] = pd.cut(df['Customer_Rating'], bins=[0, 2, 3, 4, 5],
                                             labels=['Poor', 'Average', 'Good', 'Excellent'], ordered=False)
    df['Customer_Rating_Category'] = df['Customer_Rating_Category'].astype(str)

if 'Delivery_Rating_Category' not in df.columns:
    df['Delivery_Rating_Category'] = pd.cut(df['Delivery_Partner_Rating'], bins=[0, 2, 3, 4, 5],
                                             labels=['Poor', 'Average', 'Good', 'Excellent'], ordered=False)
    df['Delivery_Rating_Category'] = df['Delivery_Rating_Category'].astype(str)

# Fill NaN values
df = df.fillna('Unknown')

# Convert to records
records = []
for _, row in df.iterrows():
    record = {}
    for key, val in row.items():
        if pd.isna(val):
            record[key] = None
        elif isinstance(val, (np.integer, np.floating)):
            record[key] = float(val) if isinstance(val, np.floating) else int(val)
        elif isinstance(val, (pd.Timestamp, np.datetime64)):
            record[key] = str(val)
        else:
            record[key] = str(val)
    records.append(record)

# Get filter options
companies = sorted(list(set([str(x) for x in df['Company'].unique() if x != 'Unknown'])))
cities = sorted(list(set([str(x) for x in df['City'].unique() if x != 'Unknown'])))
categories = sorted(list(set([str(x) for x in df['Product_Category'].unique() if x != 'Unknown'])))

date_min = str(df['Order_Date'].min())
date_max = str(df['Order_Date'].max())

# Create dashboard data structure
dashboard_data = {
    "raw_data": records,
    "filters": {
        "companies": companies,
        "cities": cities,
        "categories": categories,
        "date_range": {
            "min": date_min,
            "max": date_max
        }
    }
}

# Save to JSON
output_path = '/home/ubuntu/powerbi-portfolio/client/src/lib/dashboardData.json'
with open(output_path, 'w') as f:
    json.dump(dashboard_data, f)

# Check file size
import os
file_size = os.path.getsize(output_path) / (1024 * 1024)
print(f"✅ Dashboard data saved!")
print(f"Records: {len(records)}")
print(f"File size: {file_size:.2f} MB")
print(f"Companies: {len(companies)}")
print(f"Cities: {len(cities)}")
print(f"Categories: {len(categories)}")
