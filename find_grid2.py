from PIL import Image
img = Image.open('docs/img/mascot/neutral.png')
w, h = img.size
grays = set()
for x in range(w):
    for y in range(h):
        r, g, b, a = img.getpixel((x, y))
        # check if it's grayscale and not too dark
        if abs(r-g) < 10 and abs(g-b) < 10 and r > 150 and r < 245 and a > 0:
            grays.add((r,g,b))
print(len(grays))
if len(grays) > 0:
    print(list(grays)[:10])
