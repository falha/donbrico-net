import os
import glob
import re

base_dir = r"c:\dev\donbrico-net"
html_files = glob.glob(os.path.join(base_dir, "**", "index.html"), recursive=True)

nav_old = """              <a href="/ai-reply-assistant/" data-i18n="nav.extensionsReply"
                >AI Reply Assistant</a
              >
              <a href="/workdesk/" data-i18n="nav.extensionsWorkdesk"
                >WorkDesk</a
              >"""

nav_new = """              <a href="/ai-reply-assistant/" data-i18n="nav.extensionsReply"
                >AI Reply Assistant</a
              >
              <a href="/host-reply/" data-i18n="nav.extensionsHostReply"
                >HostReply AI</a
              >
              <a href="/workdesk/" data-i18n="nav.extensionsWorkdesk"
                >WorkDesk</a
              >"""

footer_old = """            <a href="/ai-reply-assistant/" data-i18n="nav.extensionsReply"
              >AI Reply Assistant</a
            >
            <a href="/workdesk/" data-i18n="nav.extensionsWorkdesk">WorkDesk</a>"""

footer_new = """            <a href="/ai-reply-assistant/" data-i18n="nav.extensionsReply"
              >AI Reply Assistant</a
            >
            <a href="/host-reply/" data-i18n="nav.extensionsHostReply">HostReply AI</a>
            <a href="/workdesk/" data-i18n="nav.extensionsWorkdesk">WorkDesk</a>"""

for file_path in html_files:
    if "scratch" in file_path or ".kilo" in file_path or "assets" in file_path or "host-reply" in file_path:
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    modified = False
    
    if nav_old in content:
        content = content.replace(nav_old, nav_new)
        modified = True
    elif "HostReply AI" not in content and "/ai-reply-assistant/" in content:
        # Fallback regex replace for nav
        content, n = re.subn(r'(<a href="/ai-reply-assistant/".*?>\s*AI Reply Assistant\s*</a\s*>\s*)<a href="/workdesk/"',
                             r'\1<a href="/host-reply/" data-i18n="nav.extensionsHostReply">\n                HostReply AI</a\n              >\n              <a href="/workdesk/"',
                             content, flags=re.IGNORECASE)
        if n > 0:
            modified = True
        
    if footer_old in content:
        content = content.replace(footer_old, footer_new)
        modified = True
    elif "HostReply AI" not in content and "/workdesk/" in content:
        # Fallback regex replace for footer
        content, n = re.subn(r'(<a href="/ai-reply-assistant/".*?>\s*AI Reply Assistant\s*</a\s*>\s*)<a href="/workdesk/"',
                             r'\1<a href="/host-reply/" data-i18n="nav.extensionsHostReply">HostReply AI</a>\n            <a href="/workdesk/"',
                             content, flags=re.IGNORECASE)
        if n > 0:
            modified = True

    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {file_path}")

# Additionally, update privacy-policy/index.html and support/index.html
privacy_path = os.path.join(base_dir, "privacy-policy", "index.html")
with open(privacy_path, "r", encoding="utf-8") as f:
    privacy_content = f.read()

if "hostReplyAi" not in privacy_content:
    # Update privacy sub-nav
    privacy_content = privacy_content.replace(
        '<a href="#ai-reply-assistant"', 
        '<a href="#host-reply-ai" data-i18n="privacyPolicy.nav.hostReplyAi">HostReply AI</a>\n        <a href="#ai-reply-assistant"'
    )
    
    # Add new section before ai-reply-assistant
    privacy_section = """
    <section style="padding: var(--spacing-xl) 0" id="host-reply-ai">
      <div class="container">
        <h2 data-i18n="privacyPolicy.hostReplyAi.sectionTitle">
          Donbrico HostReply AI — Chrome Extension
        </h2>
        <h3
          data-i18n="privacyPolicy.hostReplyAi.whatWeCollect.sectionTitle"
        >
          What data we collect
        </h3>
        <p data-i18n="privacyPolicy.hostReplyAi.whatWeCollect.paragraph">
          None. Your Host Memory property details and settings are stored locally in Chrome's storage on your device. No data is transmitted to Donbrico servers.
        </p>
        <h3 data-i18n="privacyPolicy.hostReplyAi.howStored.sectionTitle">
          How your data is stored
        </h3>
        <p data-i18n="privacyPolicy.hostReplyAi.howStored.paragraph">
          Property details are stored in Chrome's local storage. This data never leaves your device unless you use a third-party AI provider.
        </p>
        <h3
          data-i18n="privacyPolicy.hostReplyAi.thirdPartyAI.sectionTitle"
        >
          Third-party AI providers (Bring Your Own Key)
        </h3>
        <p data-i18n="privacyPolicy.hostReplyAi.thirdPartyAI.paragraph">
          If you configure a Bring Your Own Key provider such as OpenAI, the guest message and your Host Memory details are sent to that third-party provider to generate a response. If you use Gemini Nano (where available), all processing is on-device. Donbrico does not store or log any AI requests.
        </p>
        <h3 data-i18n="privacyPolicy.hostReplyAi.permissions.sectionTitle">
          Permissions used
        </h3>
        <p data-i18n="privacyPolicy.hostReplyAi.permissions.paragraph">
          storage (for Host Memory and settings), activeTab (to detect text fields), scripting (to inject the reply toolbar).
        </p>
        <h3
          data-i18n="privacyPolicy.hostReplyAi.dataDeletion.sectionTitle"
        >
          Data deletion
        </h3>
        <p data-i18n="privacyPolicy.hostReplyAi.dataDeletion.paragraph">
          Uninstalling the extension deletes all locally stored property details and settings. No data is retained on Donbrico servers.
        </p>
      </div>
    </section>
"""
    privacy_content = privacy_content.replace(
        '<section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">',
        privacy_section + '\n    <section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">'
    )
    with open(privacy_path, "w", encoding="utf-8") as f:
        f.write(privacy_content)
    print(f"Updated {privacy_path}")

support_path = os.path.join(base_dir, "support", "index.html")
with open(support_path, "r", encoding="utf-8") as f:
    support_content = f.read()

if "hostReply" not in support_content:
    support_section = """
    <section style="padding: var(--spacing-xl) 0">
      <div class="container">
        <h2 data-i18n="support.hostReply.sectionTitle">
          Donbrico HostReply AI Support
        </h2>
        <h3 data-i18n="support.hostReply.subtitle">Common Issues</h3>
        <details style="margin-bottom: var(--spacing-md)">
          <summary
            style="cursor: pointer; font-weight: 600"
            data-i18n="support.hostReply.q1.question"
          >
            The extension toolbar isn't appearing on Airbnb or Vrbo
          </summary>
          <p data-i18n="support.hostReply.q1.answer">
            Make sure you're on the messaging inbox page. Refresh the page if the toolbar doesn't appear.
          </p>
        </details>
        <details style="margin-bottom: var(--spacing-md)">
          <summary
            style="cursor: pointer; font-weight: 600"
            data-i18n="support.hostReply.q2.question"
          >
            Host Memory details aren't being used in replies
          </summary>
          <p data-i18n="support.hostReply.q2.answer">
            Check that you've saved your property details in the Host Memory tab of the extension popup.
          </p>
        </details>
      </div>
    </section>
"""
    support_content = support_content.replace(
        '<section style="padding: var(--spacing-xl) 0">\n      <div class="container">\n        <h2 data-i18n="support.aiReplyAssistant.sectionTitle">',
        support_section + '\n    <section style="padding: var(--spacing-xl) 0">\n      <div class="container">\n        <h2 data-i18n="support.aiReplyAssistant.sectionTitle">'
    )
    with open(support_path, "w", encoding="utf-8") as f:
        f.write(support_content)
    print(f"Updated {support_path}")
