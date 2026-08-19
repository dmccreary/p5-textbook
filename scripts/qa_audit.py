import os
import re
import glob

def count_syllables(word):
    word = word.lower()
    if len(word) <= 3:
        return 1
    word = re.sub(r'(?:[^laeiouy]es|ed|[^laeiouy]e)$', '', word)
    word = re.sub(r'^y', '', word)
    matches = re.findall(r'[aeiouy]{1,2}', word)
    return max(1, len(matches))

def get_readability_score(text):
    # Remove markdown syntax to get raw text
    text_clean = re.sub(r'[#*_>!\[\]\(\)-]', ' ', text)
    sentences = max(1, len(re.split(r'[.!?]+', text_clean)))
    words = text_clean.split()
    total_words = max(1, len(words))
    total_syllables = sum(count_syllables(w) for w in words)
    
    # Flesch Reading Ease formula
    score = 206.835 - 1.015 * (total_words / sentences) - 84.6 * (total_syllables / total_words)
    return round(max(0, min(100, score)))


def check_repetition(text):
    # Remove markdown and clean
    text_clean = re.sub(r'[#*_>!\[\]\(\)-]', ' ', text)
    sentences = [s.strip() for s in re.split(r'[.!?]+', text_clean) if len(s.split()) > 5]
    
    counts = {}
    for s in sentences:
        counts[s] = counts.get(s, 0) + 1
        if counts[s] > 3:
            return True # Failed repetition check
    return False

def audit_chapter(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    score_components = {"concepts": 0, "microsims": 0, "mascots": 0, "length": 0}
    
    # 1. Concept Coverage
    # Extract concept list
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
        score_components["concepts"] = 40 # Pass if no concepts listed

    # 2. MicroSim Count
    microsim_count = len(re.findall(r'<details.*?>|<iframe', content))
    score_components["microsims"] = min(20, microsim_count * 10)

    # 3. Mascot Formatting
    # Needs a welcome and celebration
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

    # Calculate Quality Score
    quality_score = int(sum(score_components.values()))
    

    # 5. Repetition Penalty
    if check_repetition(content):
        print(f"WARNING: Severe repetition detected in {filepath}!")
        quality_score -= 50
        quality_score = max(0, quality_score)

    # Calculate Readability
    readability_score = get_readability_score(content)
    
    # Inject into YAML frontmatter
    if content.startswith('---'):
        # Check if already has scores
        if 'quality_score:' in content:
            content = re.sub(r'quality_score:.*', f'quality_score: {quality_score}', content)
            content = re.sub(r'readability_score:.*', f'readability_score: {readability_score}', content)
        else:
            # Inject right before the second '---'
            parts = content.split('---', 2)
            if len(parts) >= 3:
                new_frontmatter = parts[1].strip() + f"\nquality_score: {quality_score}\nreadability_score: {readability_score}\n"
                content = f"---\n{new_frontmatter}---\n{parts[2].strip()}"
    else:
        # No frontmatter, create it
        frontmatter = f"---\nquality_score: {quality_score}\nreadability_score: {readability_score}\n---\n"
        content = frontmatter + content
        
    with open(filepath, 'w') as f:
        f.write(content)
        
    ch_name = os.path.basename(os.path.dirname(filepath))
    print(f"[{ch_name}] Quality: {quality_score}/100 | Readability: {readability_score}/100")

if __name__ == "__main__":
    files = glob.glob('docs/chapters/*/index.md')
    for f in sorted(files):
        audit_chapter(f)

