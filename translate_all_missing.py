import json
from deep_translator import GoogleTranslator

# Language code mapping (file name -> translator code)
lang_mapping = {
    'de': 'de',
    'hi': 'hi',
    'it': 'it',
    'ja': 'ja',
    'ko': 'ko',
    'pt_BR': 'pt',
    'ru': 'ru',
    'zh_CN': 'zh-CN',
    'zh_TW': 'zh-TW'
}

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

# Process each missing file
for lang_file, translator_code in lang_mapping.items():
    missing_file = f'locales/missing_{lang_file}.json'
    target_file = f'locales/{lang_file}.json'
    
    print(f"\nProcessing {lang_file}...")
    
    # Load missing keys file
    try:
        with open(missing_file, encoding='utf-8') as f:
            missing_data = json.load(f)
    except FileNotFoundError:
        print(f"  Missing file not found: {missing_file}")
        continue
    
    print(f"  Found {len(missing_data)} missing keys")
    
    # Load target language file
    try:
        with open(target_file, encoding='utf-8') as f:
            lang_data = json.load(f)
    except FileNotFoundError:
        print(f"  Target file not found: {target_file}")
        continue
    
    # Translate and add each key
    count = 0
    for key, value in missing_data.items():
        count += 1
        if count % 50 == 0:
            print(f"  Progress: {count}/{len(missing_data)}")
        
        translated_value = translate_value(value, translator_code)
        set_nested(lang_data, key, translated_value)
    
    print(f"  Completed: {count}/{len(missing_data)}")
    
    # Save updated target file
    with open(target_file, 'w', encoding='utf-8') as f:
        json.dump(lang_data, f, indent=2, ensure_ascii=False)
    
    print(f"  Saved {target_file}")

print("\nDone!")
