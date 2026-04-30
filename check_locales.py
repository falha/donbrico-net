#!/usr/bin/env python3
import json
import os
import sys

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
    # Change console code page to UTF-8 on Windows
    if os.name == 'nt':
        os.system('chcp 65001')
    
    # Path to locales directory
    locales_dir = r"C:\dev\donbrico-net\locales"
    
    # Load English as reference
    en_path = os.path.join(locales_dir, "en.json")
    try:
        with open(en_path, 'r', encoding='utf-8') as f:
            en_data = json.load(f)
    except Exception as e:
        print(f"Error loading English file: {e}")
        sys.exit(1)
    
    # Flatten English dictionary
    en_flat = flatten_dict(en_data)
    en_keys = set(en_flat.keys())
    print(f"English has {len(en_keys)} total keys")
    print()
    
    # Get all JSON files in locales directory
    all_files = [f for f in os.listdir(locales_dir) if f.endswith('.json')]
    
    # Filter out English and backup/original files
    language_files = [f for f in all_files 
                     if f != 'en.json' 
                     and not f.endswith('.backup.json') 
                     and not f.endswith('.original.json')]
    
    print(f"Checking translations for {len(language_files)} languages...")
    print()
    
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
            
            if not missing_keys:
                print(f"✓ {lang_code}: All keys present")
            else:
                print(f"✗ {lang_code}: Missing {len(missing_keys)} keys:")
                # Show first 10 missing keys
                for i, key in enumerate(sorted(list(missing_keys))[:10]):
                    print(f"  - {key}")
                if len(missing_keys) > 10:
                    print(f"  ... and {len(missing_keys) - 10} more")
            print()
            
        except Exception as e:
            print(f"Error processing {filename}: {e}")
            print()

if __name__ == "__main__":
    main()