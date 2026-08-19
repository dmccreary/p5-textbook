import json
from collections import defaultdict
import os

with open('docs/learning-graph/learning-graph.json') as f:
    data = json.load(f)

# Build prereqs: from=dependent, to=prerequisite
prereqs = defaultdict(set)
for e in data['edges']:
    prereqs[e['from']].add(e['to'])

# Find concepts with zero prerequisites (foundational)
all_ids = {n['id'] for n in data['nodes']}
foundational = all_ids - set(prereqs.keys())

print(f"Foundational concepts (no prerequisites): {len(foundational)}")
for fid in sorted(list(foundational))[:10]:
    node = next(n for n in data['nodes'] if n['id'] == fid)
    print(f"  {fid}: {node['label']}")

# Build chapter_map: concept_id -> chapter_index
chapter_map = {}
chapters = []
for file in sorted(os.listdir('docs/chapters')):
    if os.path.isdir(f'docs/chapters/{file}') and file[0].isdigit():
        with open(f'docs/chapters/{file}/index.md') as f:
            lines = f.readlines()
            cids = []
            for line in lines:
                if line.strip() and line.strip()[0].isdigit() and '. ' in line:
                    label = line.split('. ', 1)[1].strip()
                    for n in data['nodes']:
                        if n['label'].lower() == label.lower():
                            cids.append(n['id'])
            chapters.append((file, cids))

for i, (title, cids) in enumerate(chapters):
    for cid in cids:
        chapter_map[cid] = i

violations = []
for i, (title, cids) in enumerate(chapters):
    for cid in cids:
        for dep in prereqs.get(cid, set()):
            if dep in chapter_map and chapter_map[dep] > i:
                dep_node = next(n for n in data['nodes'] if n['id'] == dep)
                cid_node = next(n for n in data['nodes'] if n['id'] == cid)
                violations.append(
                    f"  {cid_node['label']}(ch{i+1}) needs "
                    f"{dep_node['label']}(ch{chapter_map[dep]+1})"
                )

if violations:
    print(f"DEPENDENCY VIOLATIONS: {len(violations)}")
else:
    print("All dependencies respected. Safe to generate content.")
