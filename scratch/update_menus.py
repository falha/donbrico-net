import os
import glob

html_files = glob.glob(r'c:\dev\donbrico-net\**\*.html', recursive=True)

search_str = '<a href="/seller-desk/" data-i18n="nav.extensionsSellerDesk">SellerDesk AI</a>'
replace_str = '<a href="/seller-desk/" data-i18n="nav.extensionsSellerDesk">SellerDesk AI</a>\n              <a href="/recruit-reply/" data-i18n="nav.extensionsRecruitReply">RecruitReply AI</a>'

# Some files might have slightly different indentation, but let's try the exact match first
# Wait, let's use a more flexible replacement
import re
pattern = re.compile(r'(<a\s+href="/seller-desk/"[^>]*>.*?</a>)')

for file_path in html_files:
    if 'node_modules' in file_path or '.git' in file_path or 'scratch' in file_path:
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'nav.extensionsSellerDesk' in content and 'nav.extensionsRecruitReply' not in content:
        # Replace the first occurrence in the Extensions dropdown and the Solutions dropdown
        new_content = pattern.sub(r'\1\n              <a href="/recruit-reply/" data-i18n="nav.extensionsRecruitReply">RecruitReply AI</a>', content)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

print("Done updating HTML files.")
