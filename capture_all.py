import os
import subprocess

sims_dir = "docs/sims"
capture_cmd = "/Users/dan/.local/bin/bk-capture-screenshot"

count = 0
for d in os.listdir(sims_dir):
    dir_path = os.path.join(sims_dir, d)
    if os.path.isdir(dir_path) and d not in ["TODO", "template", "shared-libs"]:
        # Check if the .png file exists
        png_path = os.path.join(dir_path, f"{d}.png")
        if not os.path.exists(png_path):
            print(f"Capturing screenshot for {d}...")
            subprocess.run([capture_cmd, dir_path])
            count += 1

print(f"Finished capturing {count} screenshots.")
