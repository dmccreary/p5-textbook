import re
import json

with open('docs/learning-graph/microsim-specifications.md', 'r') as f:
    text = f.read()

sims = []
sections = re.split(r'\n## ', text)
for section in sections[1:]: # skip first which is the intro
    lines = section.strip().split('\n')
    header = lines[0]
    match = re.match(r'(\d+)\.\s+(.*)', header)
    if not match: continue
    
    num = int(match.group(1))
    title = match.group(2).strip()
    sim_id = title.lower().replace(' ', '-')
    
    # Extract Educational Purpose
    purpose_match = re.search(r'\*\*Educational Purpose\*\*:\n(.*?)(\n\n|$)', section, re.DOTALL)
    purpose = purpose_match.group(1).strip().replace('\n', ' ') if purpose_match else ""
    
    # Extract Functional Specification
    func_match = re.search(r'\*\*Functional Specification\*\*:\n(.*?)(\n\n|$)', section, re.DOTALL)
    spec_text = func_match.group(1).strip().replace('\n', ' ') if func_match else ""
    
    sims.append({
        "sim_id": sim_id,
        "title": title,
        "summary": purpose,
        "heading_type": "Diagram",
        "chapter": "",
        "element_type": "microsim",
        "bloom_level": "Apply",
        "library": "p5.js",
        "iframe_src": "",
        "iframe_height": "",
        "spec_text": spec_text,
        "status": ""
    })

with open('sim_specs.json', 'w') as f:
    json.dump(sims, f, indent=4)
print(f"Extracted {len(sims)} sims")
