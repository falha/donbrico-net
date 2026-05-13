import json
from deep_translator import GoogleTranslator

en_file = 'c:/dev/donbrico-net/locales/en.json'

with open(en_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add keys
data['nav']['extensionsHostReply'] = "HostReply AI"

data['hostReply'] = {
    "page": {
      "title": "Donbrico HostReply AI — Guest Message Assistant",
      "description": "Reply to Airbnb and Vrbo guests in seconds — HostReply AI drafts professional messages directly inside your inbox, for free.",
      "ogTitle": "Donbrico HostReply AI — Guest Message Assistant",
      "ogDescription": "Reply to Airbnb and Vrbo guests in seconds — HostReply AI drafts professional messages directly inside your inbox, for free."
    },
    "hero": {
      "eyebrow": "CHROME EXTENSION",
      "title": "Reply to guests<br>in seconds.",
      "subtitle": "HostReply AI drafts professional messages directly inside your Airbnb or Vrbo inbox, for free. Includes Host Memory for your house rules and check-in info.",
      "disclaimer": "🔒 Built-in AI runs locally — data stays in your browser",
      "buttonPrimary": "Add to Chrome — Free",
      "buttonSecondary": "See how it works ↓"
    },
    "howItWorks": {
      "sectionTitle": "How It Works",
      "step1": {
        "title": "1. Save your property details",
        "description": "Store Wi-Fi details, check-in info, and house rules once in Host Memory."
      },
      "step2": {
        "title": "2. Open your inbox",
        "description": "Works directly inside your Airbnb and Vrbo messaging inbox."
      },
      "step3": {
        "title": "3. AI drafts the reply",
        "description": "HostReply reads the guest's message, pulls from Host Memory, and drafts a professional response instantly."
      }
    },
    "features": {
      "sectionTitle": "Features",
      "feature1": {
        "title": "Works where you work",
        "description": "Handles Airbnb and Vrbo messaging automatically."
      },
      "feature2": {
        "title": "Host Memory",
        "description": "Save your property details once. The AI remembers Wi-Fi, check-in codes, and rules."
      },
      "feature3": {
        "title": "Privacy First",
        "description": "Your property details are stored locally. Use on-device Chrome AI to keep everything completely private."
      },
      "feature4": {
        "title": "Bring Your Own AI",
        "description": "Connect OpenAI, Claude, or Gemini using your own API key if you prefer."
      }
    },
    "pricing": {
      "sectionTitle": "Simple pricing. No hidden costs.",
      "free": {
        "title": "Free",
        "price": "$0",
        "button": "Add to Chrome",
        "features": {
          "f1": "AI-drafted guest replies",
          "f2": "1 saved property (Host Memory)",
          "f3": "Chrome built-in AI",
          "f4": "Works directly inside inbox"
        }
      },
      "pro": {
        "title": "Pro Host",
        "price": "$6.99/month",
        "button": "Coming Soon",
        "features": {
          "f1": "Unlimited AI-generated guest replies",
          "f2": "Multiple saved properties",
          "f3": "Advanced reply scenarios",
          "f4": "Priority support"
        }
      }
    },
    "faq": {
      "sectionTitle": "Frequently Asked Questions",
      "q1": {
        "question": "Does it work with both Airbnb and Vrbo?",
        "answer": "Yes, it works directly inside both the Airbnb and Vrbo messaging inboxes."
      },
      "q2": {
        "question": "Is it really free?",
        "answer": "Yes! The free plan gives you everything you need to start, including 1 saved property for your Host Memory."
      },
      "q3": {
        "question": "What is Host Memory?",
        "answer": "Host Memory is where you save your property's specific details like Wi-Fi passwords, house rules, and check-in instructions. The AI automatically uses this info when replying to guests."
      }
    }
}

if 'nav' not in data['privacyPolicy']:
    data['privacyPolicy']['nav'] = {}
data['privacyPolicy']['nav']['hostReplyAi'] = "HostReply AI"

data['privacyPolicy']['hostReplyAi'] = {
    "sectionTitle": "Donbrico HostReply AI — Chrome Extension",
    "whatWeCollect": {
    "sectionTitle": "What data we collect",
    "paragraph": "None. Your Host Memory property details and settings are stored locally in Chrome's storage on your device. No data is transmitted to Donbrico servers."
    },
    "howStored": {
    "sectionTitle": "How your data is stored",
    "paragraph": "Property details are stored in Chrome's local storage. This data never leaves your device unless you use a third-party AI provider."
    },
    "thirdPartyAI": {
    "sectionTitle": "Third-party AI providers (Bring Your Own Key)",
    "paragraph": "If you configure a Bring Your Own Key provider such as OpenAI, the guest message and your Host Memory details are sent to that third-party provider to generate a response. If you use Gemini Nano (where available), all processing is on-device. Donbrico does not store or log any AI requests."
    },
    "permissions": {
    "sectionTitle": "Permissions used",
    "paragraph": "storage (for Host Memory and settings), activeTab (to detect text fields), scripting (to inject the reply toolbar)."
    },
    "dataDeletion": {
    "sectionTitle": "Data deletion",
    "paragraph": "Uninstalling the extension deletes all locally stored property details and settings. No data is retained on Donbrico servers."
    }
}

if 'hostReply' not in data['support']:
    data['support']['hostReply'] = {}
    
data['support']['hostReply'] = {
    "sectionTitle": "Donbrico HostReply AI Support",
    "subtitle": "Common Issues",
    "q1": {
    "question": "The extension toolbar isn't appearing on Airbnb or Vrbo",
    "answer": "Make sure you're on the messaging inbox page. Refresh the page if the toolbar doesn't appear."
    },
    "q2": {
    "question": "Host Memory details aren't being used in replies",
    "answer": "Check that you've saved your property details in the Host Memory tab of the extension popup."
    }
}

with open(en_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Now translate
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
    'nav.extensionsHostReply',
    'hostReply',
    'privacyPolicy.nav.hostReplyAi',
    'privacyPolicy.hostReplyAi',
    'support.hostReply'
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

print("Done translating!")
