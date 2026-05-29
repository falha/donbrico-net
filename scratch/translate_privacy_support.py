import json
import os
from deep_translator import GoogleTranslator

lang_mapping = {
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'it': 'it',
    'ja': 'ja',
    'ko': 'ko',
    'pt_BR': 'pt',
    'ru': 'ru',
    'zh_CN': 'zh-CN',
    'zh_TW': 'zh-TW',
    'hi': 'hi'
}

new_roots = [
    ('privacyPolicy.fileWhisperer', 'privacyPolicy.fileWhisperer'),
    ('privacyPolicy.receiptWhisperer', 'privacyPolicy.receiptWhisperer'),
    ('privacyPolicy.meetingWhisperer', 'privacyPolicy.meetingWhisperer'),
    ('support.fileWhisperer', 'support.fileWhisperer'),
    ('support.receiptWhisperer', 'support.receiptWhisperer'),
    ('support.meetingWhisperer', 'support.meetingWhisperer')
]

new_nav_keys = [
    'privacyPolicy.nav.fileWhisperer',
    'privacyPolicy.nav.receiptWhisperer',
    'privacyPolicy.nav.meetingWhisperer'
]

def translate_string(text, target_lang):
    if not text:
        return text
    if '<' in text or '>' in text:
        return text
    try:
        translator = GoogleTranslator(source='en', target=target_lang)
        return translator.translate(text)
    except Exception as e:
        print(f"    Error translating string '{text}': {e}")
        return text

def translate_node(node, target_lang):
    if isinstance(node, str):
        return translate_string(node, target_lang)
    elif isinstance(node, dict):
        new_dict = {}
        for k, v in node.items():
            new_dict[k] = translate_node(v, target_lang)
        return new_dict
    elif isinstance(node, list):
        new_list = []
        for x in node:
            new_list.append(translate_node(x, target_lang))
        return new_list
    else:
        return node

# Load English source
en_path = 'locales/en.json'
print("Loading locales/en.json...")
with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

# Helper to set nested dict key
def set_nested(obj, path, value):
    keys = path.split('.')
    current = obj
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    current[keys[-1]] = value

# Helper to get nested dict key
def get_nested(obj, path):
    keys = path.split('.')
    current = obj
    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return None
    return current

# Process each language
for lang_file, translator_code in lang_mapping.items():
    target_path = f'locales/{lang_file}.json'
    print(f"\nProcessing {lang_file} ({translator_code})...")
    
    if not os.path.exists(target_path):
        print(f"  Target file {target_path} not found. Skipping.")
        continue
        
    with open(target_path, 'r', encoding='utf-8') as f:
        target_data = json.load(f)
        
    # Translate and set nav keys
    for k in new_nav_keys:
        en_val = get_nested(en_data, k)
        if en_val:
            print(f"  Translating nav.{k} -> '{en_val}'")
            set_nested(target_data, k, translate_string(en_val, translator_code))
            
    # Translate and set main sections
    for en_key, target_key in new_roots:
        en_root_val = get_nested(en_data, en_key)
        if en_root_val:
            print(f"  Translating section '{en_key}'...")
            set_nested(target_data, target_key, translate_node(en_root_val, translator_code))
            
    # Save the file
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(target_data, f, indent=2, ensure_ascii=False)
        
    print(f"  Saved locales/{lang_file}.json")

print("\nAll privacy & support translations successfully completed!")
