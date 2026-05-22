import json
import os

file_path = r'c:\dev\donbrico-net\locales\en.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add nav item
if 'nav' not in data:
    data['nav'] = {}
data['nav']['extensionsRecruitReply'] = "RecruitReply AI"

# Add recruitReply section
data['recruitReply'] = {
  "page": {
    "title": "RecruitReply AI – Reply to Candidates in Seconds (Free Chrome Extension)",
    "description": "Reply to candidates on LinkedIn and ATS in seconds. RecruitReply AI drafts professional messages inside your inbox. Free Chrome extension.",
    "ogTitle": "RecruitReply AI – Reply to Candidates in Seconds (Free Chrome Extension)",
    "ogDescription": "Reply to candidates on LinkedIn and ATS in seconds. RecruitReply AI drafts professional messages inside your inbox. Free Chrome extension."
  },
  "hero": {
    "eyebrow": "CHROME EXTENSION",
    "title": "Reply to candidates in seconds.",
    "subtitle": "RecruitReply AI drafts professional messages directly inside your LinkedIn or ATS inbox, for free. Includes template library for sourcing, follow-ups, and offers.",
    "buttonPrimary": "Add to Chrome — Free",
    "buttonSecondary": "See how it works ↓",
    "disclaimer": "🔒 Built-in AI runs locally — data stays in your browser"
  },
  "howItWorks": {
    "sectionTitle": "How It Works",
    "step1": {
      "title": "1. Save your templates",
      "description": "Store your sourcing outreach, follow-ups, offers, and rejection letters in the library."
    },
    "step2": {
      "title": "2. Open your ATS or LinkedIn",
      "description": "Works directly inside LinkedIn, Gmail, Greenhouse, Lever, and Workday."
    },
    "step3": {
      "title": "3. AI drafts the reply",
      "description": "RecruitReply uses your template, reads the context, and drafts a personalized response instantly."
    }
  },
  "features": {
    "sectionTitle": "Features",
    "feature1": {
      "title": "Works where you work",
      "description": "Handles LinkedIn InMails and ATS email composers automatically."
    },
    "feature2": {
      "title": "Smart Variables",
      "description": "Save your templates with {{name}}, {{role}}, and {{company}}. AI replaces them dynamically."
    },
    "feature3": {
      "title": "Privacy First",
      "description": "Your templates are stored locally. Use on-device Chrome AI to keep everything completely private."
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
      "features": {
        "f1": "5 Saved Reply templates",
        "f2": "1 ATS profile",
        "f3": "5 core smart variables",
        "f4": "10 AI replies/day",
        "f5": "3 Reply Scenarios",
        "f6": "Single BYOK provider",
        "f7": "3 recruiter tones"
      },
      "button": "Add to Chrome"
    },
    "proMonthly": {
      "title": "Pro (Monthly)",
      "price": "$7.99/mo",
      "features": {
        "f1": "Unlimited AI replies",
        "f2": "Unlimited saved replies",
        "f3": "Unlimited profiles",
        "f4": "5 recruiter tones",
        "f5": "Export/import templates",
        "f6": "20+ Smart variables",
        "f7": "Multiple BYOK providers",
        "f8": "Priority support"
      },
      "button": "Subscribe monthly"
    },
    "proLifetime": {
      "title": "Pro (Lifetime)",
      "price": "$69",
      "tagline": "Pay once, use forever",
      "features": {
        "f1": "Everything in Pro Monthly",
        "f2": "No recurring fees",
        "f3": "Future updates included",
        "f4": "Early adopter pricing"
      },
      "button": "Lifetime pass"
    }
  },
  "faq": {
    "sectionTitle": "Frequently Asked Questions",
    "q1": {
      "question": "Does it work with LinkedIn and major ATS platforms?",
      "answer": "Yes, it works directly inside LinkedIn InMail, Gmail, and most ATS platforms like Greenhouse and Lever."
    },
    "q2": {
      "question": "Is it really free?",
      "answer": "Yes! The free plan gives you everything you need to start, including 5 saved templates for your library."
    },
    "q3": {
      "question": "Are candidates' data safe?",
      "answer": "Yes, all processing stays on-device with Gemini Nano (Chrome). If you use your own API key, data goes only to that provider. Donbrico never sees your messages."
    }
  }
}

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Updated en.json with recruitReply keys.")
