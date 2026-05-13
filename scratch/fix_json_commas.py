import os
import glob
import re

base_dir = r"c:\dev\donbrico-net\locales"
json_files = glob.glob(os.path.join(base_dir, "*.json"))

for file_path in json_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Fix missing comma after byRole
    new_content = re.sub(r'("byRole":\s*"[^"]*")\s*"extensionsReply"', r'\1,\n    "extensionsReply"', content)
    
    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Fixed commas in {file_path}")

print("Done fixing commas.")
