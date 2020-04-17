import json

with open('./assets/villager-data/villager-data.json', 'r') as f:
    villager_data = json.load(f)


unique_keys = []
for villager in villager_data:
    for key in villager_data[villager]:
        if key not in unique_keys:
            unique_keys.append(key)

print(unique_keys)