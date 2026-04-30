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
    
    # Check fr.json
    fr_path = os.path.join(locales_dir, "fr.json")
    with open(fr_path, 'r', encoding='utf-8') as f:
        fr_data = json.load(f)
    
    fr_flat = flatten_dict(fr_data)
    fr_keys = set(fr_flat.keys())
    
    # Find missing keys
    missing_keys = en_keys - fr_keys
    
    print(f"French missing {len(missing_keys)} keys:")
    for key in sorted(list(missing_keys)):
        print(f"  - {key}")
    
    print("\n" + "="*50)
    
    # Check pt_BR_fixed.json
    ptbr_path = os.path.join(locales_dir, "pt_BR_fixed.json")
    with open(ptbr_path, 'r', encoding='utf-8') as f:
        ptbr_data = json.load(f)
    
    ptbr_flat = flatten_dict(ptbr_data)
    ptbr_keys = set(ptbr_flat.keys())
    
    # Find missing keys
    missing_keys_ptbr = en_keys - ptbr_keys
    
    print(f"Portuguese (BR) fixed missing {len(missing_keys_ptbr)} keys:")
    for key in sorted(list(missing_keys_ptbr)):
        print(f"  - {key}")

if __name__ == "__main__":
    main()