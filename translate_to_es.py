import json
from deep_translator import GoogleTranslator

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

# Extract English values
print("Extracting English values...")
en_values = {}
for key in new_keys:
    value = get_nested(en_data, key)
    if value is not None:
        en_values[key] = value
        print(f"  {key}")

# Load Spanish file
print("\nLoading Spanish file...")
with open('locales/es.json', encoding='utf-8') as f:
    es_data = json.load(f)

# Translate each key
print("\nTranslating to Spanish...")
for key, en_value in en_values.items():
    print(f"  Translating {key}...")
    translated_value = translate_value(en_value, 'es')
    set_nested(es_data, key, translated_value)

# Save
print("\nSaving Spanish file...")
with open('locales/es.json', 'w', encoding='utf-8') as f:
    json.dump(es_data, f, indent=2, ensure_ascii=False)

print("Done!")
