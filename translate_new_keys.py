import json
from deep_translator import GoogleTranslator
import sys

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

# The newly added keys that need to be translated
new_keys = [
    'about.contact.description',
    'about.contact.responseTime',
    'about.extensions',
    'about.solo.description',
    'about.solo.game',
    'extensionsHub.autofill',
    'extensionsHub.edge',
    'extensionsHub.privacyNote',
    'extensionsHub.reply',
    'extensionsHub.workdesk',
    'solutions.automation.breadcrumb',
    'solutions.automation.target',
    'solutions.automation.steps',
    'solutions.automation.related',
    'solutions.communication.breadcrumb',
    'solutions.communication.target',
    'solutions.communication.steps',
    'solutions.communication.related',
    'solutions.workspace.breadcrumb',
    'solutions.workspace.target',
    'solutions.workspace.steps',
    'solutions.workspace.related',
    'solutions.ecommerceSupport.cta',
    'solutions.insurance.target',
    'solutions.insurance.cta',
    'solutions.insurance.faq.title',
    'solutions.supportTeams.faq.title',
    'solutions.supportTeams.target',
    'solutions.browserWorkspace.faq.title',
    'solutions.browserWorkspace.target',
    'solutions.jobSeekers.solution.description',
    'solutions.jobSeekers.target',
    'solutions.recruiters.cta',
    'solutions.recruiters.messageLibrary'
]

# Function to get nested value
def get_nested(obj, path):
    keys = path.split('.')
    current = obj
    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return None
    return current

# Function to set nested value
def set_nested(obj, path, value):
    keys = path.split('.')
    current = obj
    for key in keys[:-1]:
        if key not in current:
            current[key] = {}
        current = current[key]
    current[keys[-1]] = value

# Function to translate text (handles both strings and dicts)
def translate_value(value, target_lang):
    if isinstance(value, str):
        try:
            # Skip HTML tags and special characters
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
print("Loading English file...")
with open('locales/en.json', encoding='utf-8') as f:
    en_data = json.load(f)

# Extract English values for the new keys
print("Extracting English values for new keys...")
en_values = {}
for key in new_keys:
    value = get_nested(en_data, key)
    if value is not None:
        en_values[key] = value
        print(f"  {key}")

# Translate to each language
for lang_code, lang_name in languages.items():
    print(f"\nTranslating to {lang_name} ({lang_code})...")
    
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
        translated_value = translate_value(en_value, lang_code)
        set_nested(target_data, key, translated_value)
    
    # Save the updated file
    with open(f'locales/{lang_code}.json', 'w', encoding='utf-8') as f:
        json.dump(target_data, f, indent=2, ensure_ascii=False)
    print(f"  Saved locales/{lang_code}.json")

print("\nTranslation complete!")
