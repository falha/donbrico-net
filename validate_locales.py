import json
import os

languages = ['en', 'es', 'de', 'it', 'ja', 'ko', 'zh_CN', 'zh_TW', 'hi', 'ru', 'pt_BR', 'fr']

print("Validating JSON files in locales directory...\n")

all_valid = True

for lang in languages:
    file_path = f'locales/{lang}.json'
    if os.path.exists(file_path):
        try:
            with open(file_path, encoding='utf-8') as f:
                json.load(f)
            print(f"✓ {lang}.json - Valid")
        except json.JSONDecodeError as e:
            print(f"✗ {lang}.json - INVALID: {e}")
            all_valid = False
    else:
        print(f"✗ {lang}.json - File not found")
        all_valid = False

print("\n" + "="*50)
if all_valid:
    print("All JSON files are valid!")
else:
    print("Some JSON files have errors!")
