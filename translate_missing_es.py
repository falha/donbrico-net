import json
from deep_translator import GoogleTranslator

def set_nested(obj, path, value):
    """Set a value in a nested dictionary using dot notation path"""
    keys = path.split('.')
    current = obj
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    current[keys[-1]] = value

def translate_value(value, target_lang):
    """Translate a value (string, dict, or list) to target language"""
    if isinstance(value, str):
        try:
            # Skip HTML tags
            if '<' in value or '>' in value:
                return value
            translator = GoogleTranslator(source='en', target=target_lang)
            return translator.translate(value)
        except Exception as e:
            print(f"Error translating: {e}")
            return value
    elif isinstance(value, dict):
        translated = {}
        for k, v in value.items():
            translated[k] = translate_value(v, target_lang)
        return translated
    elif isinstance(value, list):
        translated = []
        for item in value:
            translated.append(translate_value(item, target_lang))
        return translated
    else:
        return value

# Load missing keys file
print("Loading missing_es.json...")
with open('locales/missing_es.json', encoding='utf-8') as f:
    missing_data = json.load(f)

print(f"Found {len(missing_data)} missing keys")

# Load Spanish file
print("Loading es.json...")
with open('locales/es.json', encoding='utf-8') as f:
    es_data = json.load(f)

# Translate and add each key
print("Translating and adding keys to es.json...")
count = 0
for key, value in missing_data.items():
    count += 1
    if count % 50 == 0:
        print(f"  Progress: {count}/{len(missing_data)}")
    
    translated_value = translate_value(value, 'es')
    set_nested(es_data, key, translated_value)

print(f"  Completed: {count}/{len(missing_data)}")

# Save updated Spanish file
print("Saving updated es.json...")
with open('locales/es.json', 'w', encoding='utf-8') as f:
    json.dump(es_data, f, indent=2, ensure_ascii=False)

print("Done!")
