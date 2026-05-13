import os
import glob
import json

base_dir = r"c:\dev\donbrico-net\locales"
json_files = glob.glob(os.path.join(base_dir, "*.json"))

for file_path in json_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            json.load(f)
    except Exception as e:
        print(f"Error in {file_path}: {e}")
