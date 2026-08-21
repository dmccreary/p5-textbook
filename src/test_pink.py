import glob
from PIL import Image

def count_pink(path):
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    pink_count = 0
    # convert to HSV
    hsv_img = img.convert("HSV")
    
    for x in range(w):
        for y in range(h):
            r, g, b, a = img.getpixel((x, y))
            if a == 0: continue
            
            # Using RGB heuristics for pink/magenta
            # High red, high blue, low green
            if r > g + 30 and b > g + 30 and (r > 100 or b > 100):
                pink_count += 1
                
    print(f"{path}: {pink_count} pink pixels")

for file in glob.glob("docs/img/mascot/*.png"):
    count_pink(file)
