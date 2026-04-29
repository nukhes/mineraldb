import pandas as pd

dataset = './src/dataset/mineral-properties.csv'

df = pd.read_csv(dataset)

# check for duplicate rows
duplicate_rows = df.duplicated().sum()

# sort data by 'Name'
df_sorted = df.sort_values(by='Name', ascending=True)
is_sorted = True
try:
    df_sorted.to_csv(dataset, index=False)
except Exception as e:
    is_sorted = False

print(f"""
=================
DATASET DIAGNOSIS
=================
duplicate_rows: {duplicate_rows}
is_sorted: {is_sorted}
""")