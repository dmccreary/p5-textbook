import sys
from PIL import Image, ImageDraw

def process(input_path, output_path):
    print(f"Loading '{input_path}'...")
    img = Image.open(input_path).convert("RGBA")
    
    # 1. Floodfill from all 4 corners to remove pink background
    w, h = img.size
    for c in [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]:
        r, g, b, a = img.getpixel(c)
        # Check if it's pink (high red, low green, high blue)
        if r > 200 and g < 100 and b > 200:
            ImageDraw.floodfill(img, xy=c, value=(255, 0, 255, 0), thresh=60)
            
    # 2. Halo removal (remove leftover pink fringe)
    pixels = img.load()
    
    for pass_num in range(3):
        halo_pixels = []
        for y in range(h):
            for x in range(w):
                if pixels[x, y][3] > 0:
                    is_edge = False
                    for dx, dy in [(0,1), (1,0), (0,-1), (-1,0)]:
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < w and 0 <= ny < h:
                            if pixels[nx, ny][3] == 0:
                                is_edge = True
                                break
                    
                    if is_edge:
                        r, g, b, a = pixels[x, y]
                        # Dissolve if it looks pinkish
                        if r > 150 and g < 150 and b > 150:
                            halo_pixels.append((x, y))
                            
        for x, y in halo_pixels:
            pixels[x, y] = (255, 0, 255, 0)
            
    img.save(output_path, "PNG")
    print(f"Pink background successfully removed. Saved to: {output_path}")

if __name__ == "__main__":
    process(sys.argv[1], sys.argv[2])
