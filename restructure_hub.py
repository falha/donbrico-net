import json

languages = ['es', 'de', 'it', 'ja', 'ko', 'zh_CN', 'zh_TW', 'hi', 'ru', 'pt_BR', 'fr']

def get_nested(obj, path):
    keys = path.split('.')
    current = obj
    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return None
    return current

def set_nested(obj, path, value):
    keys = path.split('.')
    current = obj
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    current[keys[-1]] = value

# Load English file to get the new structure
print("Loading en.json...")
with open('locales/en.json', encoding='utf-8') as f:
    en_data = json.load(f)

# Extract the new hub structure
new_hub_structure = get_nested(en_data, 'solutions.hub')

for lang in languages:
    print(f"\nProcessing {lang}.json...")
    
    # Load the target language file
    try:
        with open(f'locales/{lang}.json', encoding='utf-8') as f:
            lang_data = json.load(f)
    except FileNotFoundError:
        print(f"  File not found: locales/{lang}.json")
        continue
    
    # Update the hub structure
    set_nested(lang_data, 'solutions.hub', new_hub_structure)
    
    # Save the updated file
    with open(f'locales/{lang}.json', 'w', encoding='utf-8') as f:
        json.dump(lang_data, f, indent=2, ensure_ascii=False)
    print(f"  Updated {lang}.json")

print("\nDone!")
