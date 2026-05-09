import json
from deep_translator import GoogleTranslator

languages = ['es', 'de', 'it', 'ja', 'ko', 'zh_CN', 'zh_TW', 'hi', 'ru', 'pt_BR', 'fr']

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

# Load English file
print("Loading en.json...")
with open('locales/en.json', encoding='utf-8') as f:
    en_data = json.load(f)

# Extract the hub structure
hub_structure = en_data['solutions']['hub']

# Translate to each language
for lang in languages:
    print(f"\nTranslating hub structure to {lang}...")
    
    # Load the target language file
    try:
        with open(f'locales/{lang}.json', encoding='utf-8') as f:
            lang_data = json.load(f)
    except FileNotFoundError:
        print(f"  File not found: locales/{lang}.json")
        continue
    
    # Translate the hub structure
    translated_hub = translate_value(hub_structure, lang)
    
    # Update the hub structure in the target file
    lang_data['solutions']['hub'] = translated_hub
    
    # Save the updated file
    with open(f'locales/{lang}.json', 'w', encoding='utf-8') as f:
        json.dump(lang_data, f, indent=2, ensure_ascii=False)
    print(f"  Updated {lang}.json")

print("\nDone!")
