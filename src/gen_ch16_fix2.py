import re

with open('docs/chapters/16-css-styling-layouts/index.md', 'r') as f:
    content = f.read()

# We need around 3000 words.
# 26262 is too much. Let's just generate fresh content.
