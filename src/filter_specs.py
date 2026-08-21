import json

with open('sim_specs.json', 'r') as f:
    sims = json.load(f)

# Keep only 4 to 18
sims = sims[3:18]

with open('sim_specs_filtered.json', 'w') as f:
    json.dump(sims, f, indent=4)
print(f"Filtered down to {len(sims)} sims")
