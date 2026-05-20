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
      if (data.nav && !data.nav.extensionsSellerDesk) {
        data.nav.extensionsSellerDesk = "SellerDesk AI";
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Updated ' + file);
      }
    } catch (e) {
      console.error('Error parsing ' + file);
    }
  }
});
