const fs = require('fs');

const filePath = 'c:/dev/donbrico-net/privacy-policy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add link in nav
if (!content.includes('href="#seller-desk"')) {
  content = content.replace(
    /(<a href="#trade-desk" data-i18n="privacyPolicy\.nav\.tradeDesk"\s*>TradeDesk AI<\/a>)/,
    '$1\n        <a href="#seller-desk" data-i18n="privacyPolicy.nav.sellerDesk">SellerDesk AI</a>'
  );
}

// 2. Add section after TradeDesk AI
const sellerDeskSection = `
    <section style="padding: var(--spacing-xl) 0" id="seller-desk">
      <div class="container">
        <h2 data-i18n="privacyPolicy.sellerDesk.sectionTitle">
          SellerDesk AI
        </h2>
        <h3
          data-i18n="privacyPolicy.sellerDesk.whatWeCollect.sectionTitle"
        >
          What data we collect
        </h3>
        <p data-i18n="privacyPolicy.sellerDesk.whatWeCollect.paragraph">
          None. Your store profiles, saved replies, and settings are stored locally in Chrome's storage on your device. No data is transmitted to Donbrico servers.
        </p>
        <h3 data-i18n="privacyPolicy.sellerDesk.howStored.sectionTitle">
          How your data is stored
        </h3>
        <p data-i18n="privacyPolicy.sellerDesk.howStored.paragraph">
          Store profiles and templates are stored in Chrome's local storage. This data never leaves your device unless you use a third-party AI provider.
        </p>
        <h3
          data-i18n="privacyPolicy.sellerDesk.thirdPartyAI.sectionTitle"
        >
          Third-party AI providers (Bring Your Own Key)
        </h3>
        <p data-i18n="privacyPolicy.sellerDesk.thirdPartyAI.paragraph">
          If you configure a Bring Your Own Key provider such as OpenAI, the buyer message and your store profile details are sent to that third-party provider to generate a response. If you use Gemini Nano (where available), all processing is on-device. Donbrico does not store or log any AI requests.
        </p>
        <h3 data-i18n="privacyPolicy.sellerDesk.permissions.sectionTitle">
          Permissions used
        </h3>
        <p data-i18n="privacyPolicy.sellerDesk.permissions.paragraph">
          storage (for store profiles and settings), activeTab (to detect text fields), scripting (to inject the reply toolbar).
        </p>
        <h3
          data-i18n="privacyPolicy.sellerDesk.dataDeletion.sectionTitle"
        >
          Data deletion
        </h3>
        <p data-i18n="privacyPolicy.sellerDesk.dataDeletion.paragraph">
          Uninstalling the extension deletes all locally stored store details and settings. No data is retained on Donbrico servers.
        </p>
      </div>
    </section>
`;

if (!content.includes('id="seller-desk"')) {
  // Find where trade-desk section ends
  const tradeDeskEnd = '</p>\n      </div>\n    </section>\n\n    <section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">';
  
  content = content.replace(tradeDeskEnd, '</p>\n      </div>\n    </section>\n' + sellerDeskSection + '\n    <section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Privacy policy updated.');
