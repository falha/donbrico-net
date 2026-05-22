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
    'nav.extensionsRecruitReply',
    'recruitReply.page.title',
    'recruitReply.page.description',
    'recruitReply.page.ogTitle',
    'recruitReply.page.ogDescription',
    'recruitReply.hero.eyebrow',
    'recruitReply.hero.title',
    'recruitReply.hero.subtitle',
    'recruitReply.hero.buttonPrimary',
    'recruitReply.hero.buttonSecondary',
    'recruitReply.hero.disclaimer',
    'recruitReply.howItWorks.sectionTitle',
    'recruitReply.howItWorks.step1.title',
    'recruitReply.howItWorks.step1.description',
    'recruitReply.howItWorks.step2.title',
    'recruitReply.howItWorks.step2.description',
    'recruitReply.howItWorks.step3.title',
    'recruitReply.howItWorks.step3.description',
    'recruitReply.features.sectionTitle',
    'recruitReply.features.feature1.title',
    'recruitReply.features.feature1.description',
    'recruitReply.features.feature2.title',
    'recruitReply.features.feature2.description',
    'recruitReply.features.feature3.title',
    'recruitReply.features.feature3.description',
    'recruitReply.features.feature4.title',
    'recruitReply.features.feature4.description',
    'recruitReply.pricing.sectionTitle',
    'recruitReply.pricing.free.title',
    'recruitReply.pricing.free.price',
    'recruitReply.pricing.free.features.f1',
    'recruitReply.pricing.free.features.f2',
    'recruitReply.pricing.free.features.f3',
    'recruitReply.pricing.free.features.f4',
    'recruitReply.pricing.free.features.f5',
    'recruitReply.pricing.free.features.f6',
    'recruitReply.pricing.free.features.f7',
    'recruitReply.pricing.free.button',
    'recruitReply.pricing.proMonthly.title',
    'recruitReply.pricing.proMonthly.price',
    'recruitReply.pricing.proMonthly.features.f1',
    'recruitReply.pricing.proMonthly.features.f2',
    'recruitReply.pricing.proMonthly.features.f3',
    'recruitReply.pricing.proMonthly.features.f4',
    'recruitReply.pricing.proMonthly.features.f5',
    'recruitReply.pricing.proMonthly.features.f6',
    'recruitReply.pricing.proMonthly.features.f7',
    'recruitReply.pricing.proMonthly.features.f8',
    'recruitReply.pricing.proMonthly.button',
    'recruitReply.pricing.proLifetime.title',
    'recruitReply.pricing.proLifetime.price',
    'recruitReply.pricing.proLifetime.tagline',
    'recruitReply.pricing.proLifetime.features.f1',
    'recruitReply.pricing.proLifetime.features.f2',
    'recruitReply.pricing.proLifetime.features.f3',
    'recruitReply.pricing.proLifetime.features.f4',
    'recruitReply.pricing.proLifetime.button',
    'recruitReply.faq.sectionTitle',
    'recruitReply.faq.q1.question',
    'recruitReply.faq.q1.answer',
    'recruitReply.faq.q2.question',
    'recruitReply.faq.q2.answer',
    'recruitReply.faq.q3.question',
    'recruitReply.faq.q3.answer'
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
        print(f"  {key}")

for lang_code, lang_name in languages.items():
    print(f"\nTranslating to {lang_name} ({lang_code})...")
    
    try:
        with open(f'locales/{lang_code}.json', encoding='utf-8') as f:
            target_data = json.load(f)
    except FileNotFoundError:
        print(f"  File not found: locales/{lang_code}.json")
        continue
    
    for key, en_value in en_values.items():
        translated_value = translate_value(en_value, lang_code)
        set_nested(target_data, key, translated_value)
    
    with open(f'locales/{lang_code}.json', 'w', encoding='utf-8') as f:
        json.dump(target_data, f, indent=2, ensure_ascii=False)
    print(f"  Saved locales/{lang_code}.json")

print("\nTranslation complete!")
