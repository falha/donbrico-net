const fs = require('fs');

const filePath = 'c:/dev/donbrico-net/privacy-policy/index.html';
let content = fs.readFileSync(filePath, 'utf8');

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
  // Use exact match block logic
  const searchStr = '        </p>\r\n      </div>\r\n    </section>\r\n\r\n    <section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">';
  const replaceStr = '        </p>\r\n      </div>\r\n    </section>\r\n' + sellerDeskSection + '\r\n    <section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">';
  
  if(content.includes(searchStr)) {
      content = content.replace(searchStr, replaceStr);
  } else {
      console.log('Could not find the target string for section replacement. Trying with just \\n instead of \\r\\n');
      const searchStr2 = '        </p>\n      </div>\n    </section>\n\n    <section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">';
      const replaceStr2 = '        </p>\n      </div>\n    </section>\n' + sellerDeskSection + '\n    <section style="padding: var(--spacing-xl) 0" id="ai-reply-assistant">';
      
      if(content.includes(searchStr2)) {
          content = content.replace(searchStr2, replaceStr2);
      } else {
          console.log('Failed completely');
      }
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Privacy policy updated.');
