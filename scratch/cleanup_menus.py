import os
import glob
import re

html_files = glob.glob(r'c:\dev\donbrico-net\**\*.html', recursive=True)

# We want to find the sequence:
# <a href="/solutions/browser-workspace/" data-i18n="nav.solutionsBrowserWorkspace">Browser Workspace</a>
# optionally followed by spaces/newlines
# then up to 4 <a> tags
# then </div>

pattern = re.compile(
    r'(<a\s+href="/solutions/browser-workspace/"\s+data-i18n="nav\.solutionsBrowserWorkspace"\s*>\s*Browser Workspace\s*</a>)\s*'
    r'<a\s+href="/host-reply/"[^>]*>.*?</a>\s*'
    r'<a\s+href="/trade-desk/"[^>]*>.*?</a>\s*'
    r'<a\s+href="/seller-desk/"[^>]*>.*?</a>\s*'
    r'(?:<a\s+href="/recruit-reply/"[^>]*>.*?</a>\s*)?'
    r'(</div>)',
    re.DOTALL
)

for file_path in html_files:
    if 'node_modules' in file_path or '.git' in file_path or 'scratch' in file_path:
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = pattern.subn(r'\1\n              \2', content)
    if count > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Cleaned up {file_path}")

print("Done cleaning up HTML files.")
