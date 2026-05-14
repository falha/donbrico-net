import json
import os
from deep_translator import GoogleTranslator

def get_all_keys(d, prefix=''):
    keys = {}
    for k, v in d.items():
        new_key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            keys.update(get_all_keys(v, new_key))
        else:
            keys[new_key] = v
    return keys

def set_nested(obj, path, value):
    keys = path.split('.')
    current = obj
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    current[keys[-1]] = value

def translate_missing(en_file, target_files, target_langs):
    with open(en_file, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    en_keys = get_all_keys(en_data)
    
    for target_file, lang_code in zip(target_files, target_langs):
        print(f"Processing {target_file} ({lang_code})...")
        if not os.path.exists(target_file):
            print(f"Skipping {target_file} (not found)")
            continue
            
        with open(target_file, 'r', encoding='utf-8') as f:
            try:
                target_data = json.load(f)
            except json.JSONDecodeError:
                print(f"Error decoding {target_file}. Attempting to fix...")
                # Skip for now or handle later
                continue
        
        target_keys = get_all_keys(target_data)
        
        # Keys that are missing OR have the exact same value as English (likely placeholders)
        keys_to_translate = []
        for k, en_val in en_keys.items():
            if k not in target_keys or (target_keys[k] == en_val and isinstance(en_val, str) and len(en_val) > 2):
                # Extra check for short strings or placeholders we might want to keep (like "$0")
                if en_val == "$0" or en_val == "Free":
                    if k not in target_keys:
                        keys_to_translate.append(k)
                else:
                    keys_to_translate.append(k)
        
        if not keys_to_translate:
            print(f"No keys to translate in {target_file}")
            continue
            
        print(f"Translating {len(keys_to_translate)} keys in {target_file}")
        
        translator = GoogleTranslator(source='en', target=lang_code)
        
        for k in keys_to_translate:
            en_val = en_keys[k]
            if not isinstance(en_val, str):
                set_nested(target_data, k, en_val)
                continue
                
            try:
                # Skip HTML-like tags for safety or wrap them
                if '<' in en_val and '>' in en_val:
                    # Simple heuristic: if it has tags, keep as is or translate carefully
                    # For now, just copy it to avoid breaking HTML
                    set_nested(target_data, k, en_val)
                else:
                    translated = translator.translate(en_val)
                    set_nested(target_data, k, translated)
                    print(f"  Translated [{k}]")
            except Exception as e:
                print(f"  Error translating {k}: {e}")
                set_nested(target_data, k, en_val)
        
        with open(target_file, 'w', encoding='utf-8') as f:
            json.dump(target_data, f, indent=2, ensure_ascii=False)
        print(f"Updated {target_file}")

if __name__ == "__main__":
    locales_dir = 'c:/dev/donbrico-net/locales'
    en_path = os.path.join(locales_dir, 'en.json')
    
    langs = {
        'es': 'es',
        'de': 'de',
        'it': 'it',
        'ja': 'ja',
        'ko': 'ko',
        'zh_CN': 'zh-CN',
        'zh_TW': 'zh-TW',
        'hi': 'hi',
        'ru': 'ru',
        'pt_BR': 'pt',
        'fr': 'fr'
    }
    
    target_files = [os.path.join(locales_dir, f"{code}.json") for code in langs.keys()]
    target_langs = list(langs.values())
    
    translate_missing(en_path, target_files, target_langs)
