import os
import glob

base_dir = r"c:\dev\donbrico-net"
html_files = glob.glob(os.path.join(base_dir, "**", "index.html"), recursive=True)

for file_path in html_files:
    if "scratch" in file_path or ".kilo" in file_path or "assets" in file_path or "host-reply" in file_path:
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    modified = False
    
    # Update solutions dropdown
    if "HostReply AI" not in content.split('href="/solutions/real-estate/"')[1].split('</li>')[0] and "/host-reply/" not in content.split('href="/solutions/real-estate/"')[1].split('</li>')[0]:
        old_str = '<a\n                href="/solutions/browser-workspace/"\n                data-i18n="nav.solutionsBrowserWorkspace"\n                >Browser Workspace</a\n              >'
        if old_str in content:
            new_str = old_str + '\n              <a href="/host-reply/" data-i18n="nav.extensionsHostReply">HostReply AI</a>'
            content = content.replace(old_str, new_str)
            modified = True
        else:
            # Try a different format
            old_str_2 = '<a href="/solutions/browser-workspace/" data-i18n="nav.solutionsBrowserWorkspace"></a>'
            if old_str_2 in content:
                new_str_2 = old_str_2 + '\n              <a href="/host-reply/" data-i18n="nav.extensionsHostReply"></a>'
                content = content.replace(old_str_2, new_str_2)
                modified = True

    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated solutions nav in {file_path}")
