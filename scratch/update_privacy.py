with open('privacy-policy/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    '<a href="#seller-desk" data-i18n="privacyPolicy.nav.sellerDesk">SellerDesk AI</a>',
    '<a href="#seller-desk" data-i18n="privacyPolicy.nav.sellerDesk">SellerDesk AI</a>\n        <a href="#recruit-reply" data-i18n="privacyPolicy.nav.recruitReply">RecruitReply AI</a>'
)

new_section = """    <section style="padding: var(--spacing-xl) 0" id="recruit-reply">
      <div class="container">
        <h2 data-i18n="privacyPolicy.recruitReplyAi.sectionTitle">
          RecruitReply AI
        </h2>
        <h3
          data-i18n="privacyPolicy.recruitReplyAi.whatWeCollect.sectionTitle"
        >
          What data we collect
        </h3>
        <p data-i18n="privacyPolicy.recruitReplyAi.whatWeCollect.paragraph">
          None. Your recruiter profiles, saved templates, and settings are stored locally in Chrome's storage on your device. No data is transmitted to Donbrico servers.
        </p>
        <h3 data-i18n="privacyPolicy.recruitReplyAi.howStored.sectionTitle">
          How your data is stored
        </h3>
        <p data-i18n="privacyPolicy.recruitReplyAi.howStored.paragraph">
          Recruiter profiles and templates are stored in Chrome's local storage. This data never leaves your device unless you use a third-party AI provider.
        </p>
        <h3
          data-i18n="privacyPolicy.recruitReplyAi.thirdPartyAI.sectionTitle"
        >
          Third-party AI providers (Bring Your Own Key)
        </h3>
        <p data-i18n="privacyPolicy.recruitReplyAi.thirdPartyAI.paragraph">
          If you configure a Bring Your Own Key provider such as OpenAI, the candidate message and your profile details are sent to that third-party provider to generate a response. If you use Gemini Nano (where available), all processing is on-device. Donbrico does not store or log any AI requests.
        </p>
        <h3 data-i18n="privacyPolicy.recruitReplyAi.permissions.sectionTitle">
          Permissions used
        </h3>
        <p data-i18n="privacyPolicy.recruitReplyAi.permissions.paragraph">
          storage (for recruiter profiles and settings), activeTab (to detect text fields), scripting (to inject the reply toolbar).
        </p>
        <h3
          data-i18n="privacyPolicy.recruitReplyAi.dataDeletion.sectionTitle"
        >
          Data deletion
        </h3>
        <p data-i18n="privacyPolicy.recruitReplyAi.dataDeletion.paragraph">
          Uninstalling the extension deletes all locally stored data and settings. No data is retained on Donbrico servers.
        </p>
      </div>
    </section>

    <section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">"""

text = text.replace('<section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">', new_section)

with open('privacy-policy/index.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated privacy-policy/index.html")
