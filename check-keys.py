#!/usr/bin/env python3
import re
import os
import json

# Load English translations
with open('locales/en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

def get_nested_keys(data, prefix=''):
    keys = set()
    if isinstance(data, dict):
        for k, v in data.items():
            new_prefix = f"{prefix}.{k}" if prefix else k
            keys.add(new_prefix)
            keys.update(get_nested_keys(v, new_prefix))
    return keys

en_keys = get_nested_keys(en_data)

# Scan all HTML files for data-i18n attributes
html_files = []
for root, dirs, files in os.walk('.'):
    # Skip node_modules, .git, etc.
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__']]
    for filename in files:
        if filename.endswith('.html'):
            html_files.append(os.path.join(root, filename))

missing_keys = set()
found_keys = set()

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all data-i18n attributes
    matches = re.findall(r'data-i18n="([^"]+)"', content)
    for key in matches:
        found_keys.add(key)
        if key not in en_keys:
            missing_keys.add(key)

print(f"Total keys in en.json: {len(en_keys)}")
print(f"Total data-i18n keys found in HTML: {len(found_keys)}")
print(f"Missing keys: {len(missing_keys)}")

if missing_keys:
    print("\nMissing keys:")
    for key in sorted(missing_keys):
        print(f"  - {key}")
    print("\nERROR: Some keys are missing from en.json!")
else:
    print("\nAll keys present in en.json!")

# Also show keys in en.json not used in HTML (optional)
unused_keys = en_keys - found_keys
if unused_keys:
    print(f"\nKeys in en.json but not used in HTML ({len(unused_keys)}):")
    for key in sorted(unused_keys):
        print(f"  - {key}")
