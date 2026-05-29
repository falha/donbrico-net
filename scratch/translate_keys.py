import json
import os
from deep_translator import GoogleTranslator

# Supported target languages
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

new_roots = ['fileWhisperer', 'receiptWhisperer', 'meetingWhisperer']
new_nav_keys = ['tools', 'toolsFileWhisperer', 'toolsReceiptWhisperer', 'toolsMeetingWhisperer']

def translate_string(text, target_lang):
    if not text:
        return text
    # Avoid translating HTML tags
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
    target_data['nav'] = target_data.get('nav', {})
    for k in new_nav_keys:
        en_val = en_data['nav'].get(k)
        if en_val:
            print(f"  Translating nav.{k} -> '{en_val}'")
            target_data['nav'][k] = translate_string(en_val, translator_code)
            
    # Translate and set main sections
    for root in new_roots:
        en_root_val = en_data.get(root)
        if en_root_val:
            print(f"  Translating section '{root}'...")
            target_data[root] = translate_node(en_root_val, translator_code)
            
    # Save the file
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(target_data, f, indent=2, ensure_ascii=False)
        
    print(f"  Saved locales/{lang_file}.json")

print("\nAll translations successfully completed!")
