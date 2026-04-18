#!/usr/bin/env python3
import json
import os
import sys

locales_dir = 'locales'
errors = []

for filename in os.listdir(locales_dir):
    if filename.endswith('.json'):
        filepath = os.path.join(locales_dir, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                json.load(f)
            print(f"[OK] {filename} - valid JSON")
        except json.JSONDecodeError as e:
            errors.append(f"[ERR] {filename}: {e}")
            print(errors[-1])

if errors:
    print("\nValidation FAILED!")
    sys.exit(1)
else:
    print("\nAll JSON files are valid!")
    sys.exit(0)
