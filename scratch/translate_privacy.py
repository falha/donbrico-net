import json
from deep_translator import GoogleTranslator

# Language codes
languages = {
    'es': 'Spanish',
    'de': 'German',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh_CN': 'Simplified Chinese',
    'zh_TW': 'Traditional Chinese',
    'hi': 'Hindi',
    'ru': 'Russian',
    'pt_BR': 'Portuguese (Brazil)'
}

new_keys = [
    'privacyPolicy.nav.recruitReply',
    'privacyPolicy.recruitReplyAi.sectionTitle',
    'privacyPolicy.recruitReplyAi.whatWeCollect.sectionTitle',
    'privacyPolicy.recruitReplyAi.whatWeCollect.paragraph',
    'privacyPolicy.recruitReplyAi.howStored.sectionTitle',
    'privacyPolicy.recruitReplyAi.howStored.paragraph',
    'privacyPolicy.recruitReplyAi.thirdPartyAI.sectionTitle',
    'privacyPolicy.recruitReplyAi.thirdPartyAI.paragraph',
    'privacyPolicy.recruitReplyAi.permissions.sectionTitle',
    'privacyPolicy.recruitReplyAi.permissions.paragraph',
    'privacyPolicy.recruitReplyAi.dataDeletion.sectionTitle',
    'privacyPolicy.recruitReplyAi.dataDeletion.paragraph'
]

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

def translate_value(value, target_lang):
    if isinstance(value, str):
        try:
            if '<' in value or '>' in value:
                return value
            translator = GoogleTranslator(source='en', target=target_lang)
            return translator.translate(value)
        except Exception as e:
            print(f"Error translating: {e}")
            return value
    return value

print("Loading English file...")
with open('locales/en.json', encoding='utf-8') as f:
    en_data = json.load(f)

print("Extracting English values for new keys...")
en_values = {}
for key in new_keys:
    value = get_nested(en_data, key)
    if value is not None:
        en_values[key] = value

for lang_code, lang_name in languages.items():
    print(f"\nTranslating to {lang_name} ({lang_code})...")
    
    try:
        with open(f'locales/{lang_code}.json', encoding='utf-8') as f:
            target_data = json.load(f)
    except FileNotFoundError:
        continue
    
    for key, en_value in en_values.items():
        translated_value = translate_value(en_value, lang_code)
        set_nested(target_data, key, translated_value)
    
    with open(f'locales/{lang_code}.json', 'w', encoding='utf-8') as f:
        json.dump(target_data, f, indent=2, ensure_ascii=False)
    print(f"  Saved locales/{lang_code}.json")

print("\nTranslation complete!")
