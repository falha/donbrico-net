import json
import os

def flatten_dict(d, parent_key='', sep='.'):
    """Flatten a nested dictionary, concatenating keys with sep."""
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

def main():
    locales_dir = r"C:\dev\donbrico-net\locales"
    
    # Load English as reference
    en_path = os.path.join(locales_dir, "en.json")
    with open(en_path, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    en_flat = flatten_dict(en_data)
    en_keys = set(en_flat.keys())
    
    # Get all JSON files in locales directory
    all_files = [f for f in os.listdir(locales_dir) if f.endswith('.json')]
    
    # Filter out English and backup/original files
    language_files = [f for f in all_files 
                     if f != 'en.json' 
                     and not f.endswith('.backup.json') 
                     and not f.endswith('.original.json')]
    
    # Results summary
    results = {}
    
    # Check each language file
    for filename in sorted(language_files):
        lang_code = filename.replace('.json', '')
        file_path = os.path.join(locales_dir, filename)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lang_data = json.load(f)
            
            # Flatten language dictionary
            lang_flat = flatten_dict(lang_data)
            lang_keys = set(lang_flat.keys())
            
            # Find missing keys
            missing_keys = en_keys - lang_keys
            
            results[lang_code] = {
                'missing_count': len(missing_keys),
                'missing_keys': list(missing_keys)
            }
            
        except Exception as e:
            results[lang_code] = {
                'error': str(e)
            }
    
    # Print results
    print(f"English has {len(en_keys)} total keys")
    print()
    
    total_missing = 0
    for lang_code in sorted(results.keys()):
        result = results[lang_code]
        if 'error' in result:
            print(f"✗ {lang_code}: Error - {result['error']}")
        else:
            missing_count = result['missing_count']
            if missing_count == 0:
                print(f"✓ {lang_code}: All keys present")
            else:
                print(f"✗ {lang_code}: Missing {missing_count} keys")
                total_missing += missing_count
                
    print()
    print(f"Total missing keys across all languages: {total_missing}")

if __name__ == "__main__":
    main()