from PIL import Image
img = Image.open('docs/img/mascot/neutral.png')
w, h = img.size
grid_colors = set()
for x in range(0, w, 10):
    for y in range(0, 10, 1):
        pixel = img.getpixel((x, y))
        grid_colors.add(pixel)
print(grid_colors)
