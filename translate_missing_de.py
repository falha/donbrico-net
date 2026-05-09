import json
from deep_translator import GoogleTranslator

def set_nested(obj, path, value):
    keys = path.split('.')
    current = obj
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    current[keys[-1]] = value

def translate_value(value, target_lang):
    if isinstance(value, str):
        try:
            if '<' in value or '>' in value:
                return value
            translator = GoogleTranslator(source='en', target=target_lang)
            return translator.translate(value)
        except Exception as e:
            print(f"Error: {e}")
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

print("Loading missing_de.json...")
with open('locales/missing_de.json', encoding='utf-8') as f:
    missing_data = json.load(f)

print(f"Found {len(missing_data)} missing keys")

print("Loading de.json...")
with open('locales/de.json', encoding='utf-8') as f:
    de_data = json.load(f)

print("Translating to German...")
count = 0
for key, value in missing_data.items():
    count += 1
    if count % 50 == 0:
        print(f"  Progress: {count}/{len(missing_data)}")
    translated_value = translate_value(value, 'de')
    set_nested(de_data, key, translated_value)

print(f"Completed: {count}/{len(missing_data)}")

print("Saving de.json...")
with open('locales/de.json', 'w', encoding='utf-8') as f:
    json.dump(de_data, f, indent=2, ensure_ascii=False)

print("Done!")
