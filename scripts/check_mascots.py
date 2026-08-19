import os
import re

chapters = [
    "01-intro-creative-coding",
    "02-2d-primitive-shapes",
    "03-color-theory-pixels",
    "04-variables-and-scope",
    "05-control-flow-and-loops",
    "06-matrix-transformations",
    "07-linear-motion-trig",
    "08-polar-coordinates-easing",
    "09-randomness-and-walks",
    "10-perlin-noise-fields"
]

for ch in chapters:
    filepath = f"docs/chapters/{ch}/index.md"
    if not os.path.exists(filepath):
        print(f"{ch}: File not found")
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()
        
    # Find all admonitions
    admonitions = re.findall(r'!!! mascot-([a-z]+).*?\n.*?!\[.*?\]\((.*?)\)', content, re.MULTILINE)
    
    print(f"\n--- {ch} ---")
    print(f"Total Admonitions: {len(admonitions)}")
    
    types = [a[0] for a in admonitions]
    print(f"Types: {types}")
    
    has_welcome = types and types[0] == 'welcome'
    has_celebration = types and types[-1] == 'celebration'
    
    print(f"Has welcome at start: {has_welcome}")
    print(f"Has celebration at end: {has_celebration}")
    
    # Check image paths and class
    for a_type, img_path in admonitions:
        if not img_path.endswith(f"{a_type}.png){{ class=\"mascot-admonition-img\" }}") and not img_path.endswith(f"{a_type}.png) {{ class=\"mascot-admonition-img\" }}"):
             # Also check if it uses double quotes or single quotes or whatever
             pass
    
    # Find exact raw matches for debugging format
    raw_matches = re.findall(r'!!! mascot-([a-z]+)[^\n]*\n\s*!\[.*?\]\((.*?)\)(?:{ class="mascot-admonition-img" })?', content)
    for raw in raw_matches:
        if "class=\"mascot-admonition-img\"" not in content[content.find(raw[1]):content.find(raw[1])+100]:
            print(f"  Missing class on: {raw[1]}")

