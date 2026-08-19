import os, glob
from scripts.qa_audit import count_syllables, get_readability_score
import re

def audit_chapter(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    score_components = {"concepts": 0, "microsims": 0, "mascots": 0, "length": 0}
    
    # 1. Concept Coverage
    concepts_match = re.search(r'## Concepts Covered.*?(?:\n\d+\.\s+(.*?))+\n\n', content, re.DOTALL)
    concepts_list = []
    if concepts_match:
        list_text = re.search(r'(?:\n\d+\.\s+.*)+', concepts_match.group(0)).group(0)
        concepts_list = [c.strip() for c in re.findall(r'\d+\.\s+(.*)', list_text)]
    
    concepts_found = 0
    for concept in concepts_list:
        if concept.lower() in content.lower():
            concepts_found += 1
            
    if len(concepts_list) > 0:
        score_components["concepts"] = (concepts_found / len(concepts_list)) * 40
    else:
        score_components["concepts"] = 40

    # 2. MicroSim Count
    microsim_count = len(re.findall(r'<details.*?>|<iframe', content))
    score_components["microsims"] = min(20, microsim_count * 10)

    # 3. Mascot Formatting
    has_welcome = '!!! mascot-welcome' in content
    has_celeb = '!!! mascot-celebration' in content
    
    mascot_pts = 0
    if has_welcome: mascot_pts += 10
    if has_celeb: mascot_pts += 10
    score_components["mascots"] = mascot_pts
    
    # 4. Length
    word_count = len(content.split())
    if 2500 <= word_count <= 6000:
        score_components["length"] = 20
    elif word_count > 1000:
        score_components["length"] = 10

    print("Scores:", score_components)

audit_chapter('docs/chapters/16-css-styling-layouts/index.md')
