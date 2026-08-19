import re

with open('docs/chapters/02-2d-primitive-shapes/index.md', 'r') as f:
    content = f.read()

# Add metadata if not present
if "generated_by: claude skill" not in content:
    meta = """---
title: 2. 2D Primitive Shapes & Custom Geometries
description: Covers 2D drawing primitives, stroke/fill settings, vertex shapes, and Bézier curves.
generated_by: claude skill chapter-content-generator
date: 2026-08-19 07:48:00
version: 0.09
---
"""
    # Replace the first "# 2D Primitive..." with meta + title
    content = re.sub(r'# 2D Primitive Shapes & Custom Geometries', meta + '\n# 2D Primitive Shapes & Custom Geometries', content, count=1)

# Add a bit more story to the contour section to expand word count
expansion = """

Let's imagine you are trying to draw a slice of Swiss cheese. A yellow rectangle is easy. But how do you draw the holes? You could draw background-colored circles on top of the yellow rectangle, but what if there's a complex, moving image *behind* the cheese? If you just draw gray circles, they will block the image behind the cheese. You need *actual holes* where the geometry does not exist, allowing the background to show through.

To achieve this, you start a normal `beginShape()`, draw the outer boundary of the Swiss cheese slice, and then call the **Begin Contour Function** (`beginContour()`). Inside the contour block, you define the vertices of the *hole*. Crucially, the vertices of the hole must be defined in the *opposite direction* of the outer boundary (e.g., if you drew the outside clockwise, you must draw the inside hole counter-clockwise). This directional shift is what tells the graphics engine "this is negative space, subtract it from the fill."

Once the hole is defined, you call the **End Contour Function** (`endContour()`). You can open and close as many contours as you need for multiple holes, and finally close the main shape.

```javascript
// Drawing a square donut (a frame)
beginShape();
  // Outer boundary (Clockwise)
  vertex(10, 10);
  vertex(90, 10);
  vertex(90, 90);
  vertex(10, 90);
  
  beginContour();
    // Inner boundary hole (Counter-Clockwise)
    vertex(30, 30);
    vertex(30, 70);
    vertex(70, 70);
    vertex(70, 30);
  endContour();
endShape(CLOSE);
```
"""

content = content.replace("Once the hole is defined, you call the **End Contour Function** (`endContour()`) and finally close the main shape.", expansion)

with open('docs/chapters/02-2d-primitive-shapes/index.md', 'w') as f:
    f.write(content)

