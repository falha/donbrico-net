import os
import glob
import re

base_dir = r"c:\dev\donbrico-net"
html_files = glob.glob(os.path.join(base_dir, "**", "index.html"), recursive=True)

for file_path in html_files:
    if "scratch" in file_path or ".kilo" in file_path or "assets" in file_path or "host-reply" in file_path:
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    modified = False
    
    # Check if HostReply AI is missing
    if "extensionsHostReply" not in content and "host-reply" not in content:
        # Find the extensions.reply link
        content, n = re.subn(r'(<a href="/ai-reply-assistant/"[^>]*>.*?</a>)',
                             r'\1\n              <a href="/host-reply/" data-i18n="nav.extensionsHostReply"></a>',
                             content)
        if n > 0:
            modified = True
            
    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed nav in {file_path}")
