import json

file_path = r'c:\dev\donbrico-net\locales\en.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add nav item
data['privacyPolicy']['nav']['recruitReply'] = "RecruitReply AI"

# Add recruitReply section
data['privacyPolicy']['recruitReplyAi'] = {
  "sectionTitle": "RecruitReply AI",
  "whatWeCollect": {
    "sectionTitle": "What data we collect",
    "paragraph": "None. Your recruiter profiles, saved templates, and settings are stored locally in Chrome's storage on your device. No data is transmitted to Donbrico servers."
  },
  "howStored": {
    "sectionTitle": "How your data is stored",
    "paragraph": "Recruiter profiles and templates are stored in Chrome's local storage. This data never leaves your device unless you use a third-party AI provider."
  },
  "thirdPartyAI": {
    "sectionTitle": "Third-party AI providers (Bring Your Own Key)",
    "paragraph": "If you configure a Bring Your Own Key provider such as OpenAI, the candidate message and your profile details are sent to that third-party provider to generate a response. If you use Gemini Nano (where available), all processing is on-device. Donbrico does not store or log any AI requests."
  },
  "permissions": {
    "sectionTitle": "Permissions used",
    "paragraph": "storage (for recruiter profiles and settings), activeTab (to detect text fields), scripting (to inject the reply toolbar)."
  },
  "dataDeletion": {
    "sectionTitle": "Data deletion",
    "paragraph": "Uninstalling the extension deletes all locally stored data and settings. No data is retained on Donbrico servers."
  }
}

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Updated en.json with privacyPolicy.recruitReplyAi keys.")
