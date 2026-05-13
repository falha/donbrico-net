import os
import glob
import re

base_dir = r"c:\dev\donbrico-net"
html_files = [os.path.join(base_dir, "med-autofill", "index.html"), os.path.join(base_dir, "solutions", "real-estate", "index.html")]

for file_path in html_files:
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        modified = False
        
        if "HostReply AI" not in content and "host-reply" not in content.split('href="/extensions/" data-i18n="nav.extensions"')[0]:
            # Add after Browser Workspace
            content, n = re.subn(r'(<a\s*href="/solutions/browser-workspace/"[^>]*>.*?</a>)',
                                r'\1\n              <a href="/host-reply/" data-i18n="nav.extensionsHostReply"></a>',
                                content)
            if n > 0:
                modified = True
                
        if modified:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Fixed solutions nav in {file_path}")
