import re
import os

chapters = [
    "03-color-theory-pixels",
    "04-variables-and-scope",
    "05-control-flow-and-loops",
    "06-matrix-transformations",
    "07-linear-motion-trig",
    "08-polar-coordinates-easing",
    "09-randomness-and-walks",
    "10-perlin-noise-fields"
]

WELCOME_BLOCK = """
!!! mascot-welcome "Welcome to Chapter {num}!"
    ![Palette waving welcome](../../img/mascot/welcome.png){{ class="mascot-admonition-img" }}
    Palette here! Are you ready to dive into chapter {num}? Time to color outside the loops!
"""

CELEBRATION_BLOCK = """
!!! mascot-celebration "Chapter Complete!"
    ![Palette celebrating](../../img/mascot/celebration.png){{ class="mascot-admonition-img" }}
    Amazing work! You've mastered another set of core concepts. Take a moment to celebrate!
"""

def fix_content(content, ch_num):
    parts = re.split(r'(## Prerequisites.*?---)', content, flags=re.DOTALL)
    if len(parts) >= 3:
        front = parts[0] + parts[1]
        body = parts[2].strip()
        if body.startswith('TODO: Generate Chapter Content'):
            body = body.split('\n', 1)[1].strip()
            
        new_body = WELCOME_BLOCK.format(num=ch_num) + "\n\n" + body
    else:
        new_body = WELCOME_BLOCK.format(num=ch_num) + "\n\n" + content
        front = ""
        
    if "mascot-celebration" not in new_body:
        new_body = new_body + "\n\n" + CELEBRATION_BLOCK
        
    def replacer(match):
        text = match.group(0)
        clean_text = re.sub(r'>\s*\[!TIP\]', '', text)
        clean_text = re.sub(r'!!! (?:mascot|tip|note).*?\n', '', clean_text)
        clean_text = re.sub(r'>\s*\*\*Palette.*?\*\*\s*"?', '', clean_text, flags=re.IGNORECASE)
        clean_text = re.sub(r'>\s*', '', clean_text)
        clean_text = clean_text.replace('"', '').strip()
        
        return f"""!!! mascot-tip "Palette's Tip"
    ![Palette tip](../../img/mascot/tip.png){{ class="mascot-admonition-img" }}
    {clean_text}
"""
    
    # Catch blockquotes `> **Palette the Chameleon says:** "..."`
    new_body = re.sub(r'>\s*\*\*Palette the Chameleon.*?\n(?:>.*?\n)*', replacer, new_body, flags=re.IGNORECASE)
    
    # Catch GitHub alerts `> [!TIP] Palette...`
    new_body = re.sub(r'>\s*\[!TIP\]\s*Palette.*?(?:\n>\s*.*)*', replacer, new_body, flags=re.IGNORECASE)
    
    # Catch admonitions `!!! tip "Palette..."`
    new_body = re.sub(r'!!! (?:mascot|tip|note)\s*"Palette.*?(?:\n\s+.*)*', replacer, new_body, flags=re.IGNORECASE)

    return front + "\n\n" + new_body

for ch in chapters:
    filepath = f"docs/chapters/{ch}/index.md"
    ch_num = int(ch.split('-')[0])
    with open(filepath, 'r') as f:
        content = f.read()
    
    fixed = fix_content(content, ch_num)
    
    with open(filepath, 'w') as f:
        f.write(fixed)
        
    print(f"Fixed {ch}")

