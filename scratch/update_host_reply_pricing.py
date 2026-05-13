import json
from deep_translator import GoogleTranslator

en_file = 'c:/dev/donbrico-net/locales/en.json'

with open(en_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update pricing strings
data['hostReply']['pricing'] = {
    "sectionTitle": "Simple pricing. No hidden costs.",
    "free": {
    "title": "Free",
    "price": "$0",
    "button": "Add to Chrome",
    "features": {
        "f1": "5 Saved Reply templates",
        "f2": "1 property (Host Memory)",
        "f3": "5 core smart variables",
        "f4": "10 AI replies/day",
        "f5": "3 Reply Scenarios",
        "f6": "Single BYOK provider",
        "f7": "3 host tones"
    }
    },
    "proMonthly": {
    "title": "Pro (Monthly)",
    "price": "$7.99/mo",
    "button": "Subscribe monthly",
    "features": {
        "f1": "Unlimited AI replies",
        "f2": "Unlimited saved replies",
        "f3": "Unlimited properties",
        "f4": "5 host tones",
        "f5": "Export/import templates",
        "f6": "20+ Smart variables",
        "f7": "Multiple BYOK providers",
        "f8": "Priority support"
    }
    },
    "proLifetime": {
    "title": "Pro (Lifetime)",
    "price": "$69",
    "tagline": "Pay once, use forever",
    "button": "Lifetime pass",
    "features": {
        "f1": "Everything in Pro Monthly",
        "f2": "No recurring fees",
        "f3": "Future updates included",
        "f4": "Early adopter pricing"
    }
    }
}

with open(en_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

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
    'pt_BR': 'Portuguese (Brazil)',
    'fr': 'French'
}

new_keys = [
    'hostReply.pricing'
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

en_values = {}
for key in new_keys:
    value = get_nested(data, key)
    if value is not None:
        en_values[key] = value

for lang_code, lang_name in languages.items():
    print(f"Translating to {lang_name} ({lang_code})...")
    try:
        with open(f'c:/dev/donbrico-net/locales/{lang_code}.json', encoding='utf-8') as f:
            target_data = json.load(f)
    except FileNotFoundError:
        print(f"File not found: locales/{lang_code}.json")
        continue
    
    for key, en_value in en_values.items():
        translated_value = translate_value(en_value, lang_code)
        set_nested(target_data, key, translated_value)
    
    with open(f'c:/dev/donbrico-net/locales/{lang_code}.json', 'w', encoding='utf-8') as f:
        json.dump(target_data, f, indent=2, ensure_ascii=False)

print("Done translating pricing!")
