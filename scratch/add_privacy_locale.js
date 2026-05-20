const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'locales');
const files = fs.readdirSync(localesDir);

files.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(localesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    try {
      const data = JSON.parse(content);
      
      if (data.privacyPolicy) {
        if (data.privacyPolicy.nav && !data.privacyPolicy.nav.sellerDesk) {
          data.privacyPolicy.nav.sellerDesk = "SellerDesk AI";
        }
        
        if (!data.privacyPolicy.sellerDesk) {
          data.privacyPolicy.sellerDesk = {
            "sectionTitle": "SellerDesk AI",
            "whatWeCollect": {
              "sectionTitle": "What data we collect",
              "paragraph": "None. Your store profiles, saved replies, and settings are stored locally in Chrome's storage on your device. No data is transmitted to Donbrico servers."
            },
            "howStored": {
              "sectionTitle": "How your data is stored",
              "paragraph": "Store profiles and templates are stored in Chrome's local storage. This data never leaves your device unless you use a third-party AI provider."
            },
            "thirdPartyAI": {
              "sectionTitle": "Third-party AI providers (Bring Your Own Key)",
              "paragraph": "If you configure a Bring Your Own Key provider such as OpenAI, the buyer message and your store profile details are sent to that third-party provider to generate a response. If you use Gemini Nano (where available), all processing is on-device. Donbrico does not store or log any AI requests."
            },
            "permissions": {
              "sectionTitle": "Permissions used",
              "paragraph": "storage (for store profiles and settings), activeTab (to detect text fields), scripting (to inject the reply toolbar)."
            },
            "dataDeletion": {
              "sectionTitle": "Data deletion",
              "paragraph": "Uninstalling the extension deletes all locally stored store details and settings. No data is retained on Donbrico servers."
            }
          };
        }
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Updated ' + file);
      }
    } catch (e) {
      console.error('Error parsing ' + file);
    }
  }
});
