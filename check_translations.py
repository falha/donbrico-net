import json

# All the new keys that should be in all language files
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

languages = ['en', 'es', 'de', 'it', 'ja', 'ko', 'zh_CN', 'zh_TW', 'hi', 'ru', 'pt_BR', 'fr']

def get_nested(obj, path):
    keys = path.split('.')
    current = obj
    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return None
    return current

print("Checking if all new keys are present in each language file...\n")

results = {}

for lang in languages:
    file_path = f'locales/{lang}.json'
    try:
        with open(file_path, encoding='utf-8') as f:
            data = json.load(f)
        
        missing_keys = []
        for key in new_keys:
            value = get_nested(data, key)
            if value is None:
                missing_keys.append(key)
        
        if missing_keys:
            results[lang] = f"MISSING {len(missing_keys)} keys"
            print(f"✗ {lang}.json - Missing {len(missing_keys)} keys")
            for missing in missing_keys[:5]:  # Show first 5 missing
                print(f"    - {missing}")
            if len(missing_keys) > 5:
                print(f"    ... and {len(missing_keys) - 5} more")
        else:
            results[lang] = "COMPLETE"
            print(f"✓ {lang}.json - All {len(new_keys)} keys present")
    except Exception as e:
        results[lang] = f"ERROR: {e}"
        print(f"✗ {lang}.json - Error: {e}")

print("\n" + "="*50)
print("Summary:")
for lang, status in results.items():
    print(f"  {lang}: {status}")
