import json
from deep_translator import GoogleTranslator
import re

# Keys that contain HTML and need special handling
html_keys = [
    'about.solo.game',
    'docs.geminiNano.fallback.text2',  # Contains HTML link
    'docs.apiKeys.proTip.link'
]

languages = ['es', 'de', 'it', 'ja', 'ko', 'zh_CN', 'zh_TW', 'hi', 'ru', 'pt_BR']

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

def translate_html_text(text, target_lang):
    """Translate text while preserving HTML tags"""
    # Find all HTML tags
    pattern = re.compile(r'<[^>]+>')
    tags = pattern.findall(text)
    
    # Split text by tags
    parts = pattern.split(text)
    
    # Translate only the text parts (not the tags)
    translated_parts = []
    for i, part in enumerate(parts):
        if part.strip() and not part.startswith('<'):
            try:
                translator = GoogleTranslator(source='en', target=target_lang)
                translated = translator.translate(part)
                translated_parts.append(translated)
            except Exception as e:
                print(f"Error translating: {e}")
                translated_parts.append(part)
        else:
            translated_parts.append(part)
    
    # Reconstruct the text with tags
    result = ""
    tag_index = 0
    for i, part in enumerate(translated_parts):
        result += part
        if tag_index < len(tags):
            result += tags[tag_index]
            tag_index += 1
    
    return result

# Load English file
print("Loading English file...")
with open('locales/en.json', encoding='utf-8') as f:
    en_data = json.load(f)

# Extract English values for HTML keys
print("Extracting English values for HTML keys...")
en_values = {}
for key in html_keys:
    value = get_nested(en_data, key)
    if value is not None:
        en_values[key] = value
        print(f"  {key}")

# Translate to each language
for lang_code in languages:
    print(f"\nTranslating to {lang_code}...")
    
    # Load the target language file
    try:
        with open(f'locales/{lang_code}.json', encoding='utf-8') as f:
            target_data = json.load(f)
    except FileNotFoundError:
        print(f"  File not found: locales/{lang_code}.json")
        continue
    
    # Translate each key
    for key, en_value in en_values.items():
        print(f"  Translating {key}...")
        translated_value = translate_html_text(en_value, lang_code)
        set_nested(target_data, key, translated_value)
    
    # Save the updated file
    with open(f'locales/{lang_code}.json', 'w', encoding='utf-8') as f:
        json.dump(target_data, f, indent=2, ensure_ascii=False)
    print(f"  Saved locales/{lang_code}.json")

print("\nTranslation complete!")
