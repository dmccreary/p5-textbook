import sys
from PIL import Image

def process(in_path, out_path):
    img = Image.open(in_path).convert("RGBA")
    w, h = img.size
    pixels = img.load()
    
    bg_samples = []
    for x in range(0, w, w//10):
        bg_samples.append(pixels[x, 0][:3])
        bg_samples.append(pixels[x, h-1][:3])
    
    bg_r = sum(c[0] for c in bg_samples) // len(bg_samples)
    bg_g = sum(c[1] for c in bg_samples) // len(bg_samples)
    bg_b = sum(c[2] for c in bg_samples) // len(bg_samples)
    bg_brightness = (bg_r + bg_g + bg_b) / 3
    
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0: continue
            
            if r > g + 10 and b > g + 10:
                dist = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
                if dist < 100:
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    brightness = (r + g + b) / 3
                    if brightness < bg_brightness - 20:
                        alpha = int(255 * (1 - (brightness / bg_brightness)))
                        alpha = min(255, int(alpha * 1.5))
                        pixels[x, y] = (0, 0, 0, alpha)
                    else:
                        pixels[x, y] = (0, 0, 0, 0)

    # Secondary halo removal pass for anti-aliased edge pixels (mix of green and pink)
    # If a pixel borders transparency and is slightly pinkish, wipe it.
    for pass_num in range(2):
        halo = []
        for y in range(1, h-1):
            for x in range(1, w-1):
                r, g, b, a = pixels[x, y]
                if a > 0 and r > g and b > g:
                    if pixels[x-1,y][3]==0 or pixels[x+1,y][3]==0 or pixels[x,y-1][3]==0 or pixels[x,y+1][3]==0:
                        halo.append((x,y))
        for x, y in halo:
            pixels[x, y] = (0, 0, 0, 0)

    bbox = img.getbbox()
    if bbox:
        trimmed = img.crop(bbox)
        new_w = trimmed.width + 8
        new_h = trimmed.height + 8
        new_img = Image.new("RGBA", (new_w, new_h), (0, 0, 0, 0))
        new_img.paste(trimmed, (4, 4))
        new_img.save(out_path, "PNG")
    else:
        img.save(out_path, "PNG")

if __name__ == "__main__":
    process(sys.argv[1], sys.argv[2])
