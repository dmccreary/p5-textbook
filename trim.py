import sys
from PIL import Image

def trim_and_pad(path, pad=4):
    img = Image.open(path).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        # crop to the exact non-transparent bounding box
        trimmed = img.crop(bbox)
        # create new image with 4px padding
        new_w = trimmed.width + pad * 2
        new_h = trimmed.height + pad * 2
        new_img = Image.new("RGBA", (new_w, new_h), (0, 0, 0, 0))
        new_img.paste(trimmed, (pad, pad))
        new_img.save(path, "PNG")
        print(f"Trimmed and padded {path} to {new_w}x{new_h}")
    else:
        print(f"Image {path} is completely empty!")

import glob
for file in glob.glob("docs/img/mascot/*.png"):
    trim_and_pad(file)
