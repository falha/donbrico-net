# Fix the pt_BR.json file by taking the valid part
content = open(r'C:\dev\donbrico-net\locales\pt_BR.json', 'r', encoding='utf-8').read()
fixed_content = content[:41086]  # from debug script: valid JSON ends at position 41086
open(r'C:\dev\donbrico-net\locales\pt_BR_fixed.json', 'w', encoding='utf-8').write(fixed_content)
print("Fixed file written.")