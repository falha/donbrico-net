const fs = require('fs');
const path = require('path');
const localesDir = path.join(__dirname, '..', 'locales');
const files = fs.readdirSync(localesDir);

files.forEach(file => {
  if (file.endsWith('.json')) {
    const localePath = path.join(localesDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(localePath, 'utf8'));
      
      if (data.sellerDesk) {
        if (data.sellerDesk.hero && data.sellerDesk.hero.buttonPrimary) {
           data.sellerDesk.hero.buttonPrimary = "Add to Chrome — Free";
           data.sellerDesk.hero.buttonSecondary = "See how it works ↓";
        }
        if (data.sellerDesk.pricing) {
           if (data.sellerDesk.pricing.free) data.sellerDesk.pricing.free.button = "Add to Chrome";
           if (data.sellerDesk.pricing.proMonthly) data.sellerDesk.pricing.proMonthly.button = "Subscribe monthly";
           if (data.sellerDesk.pricing.proLifetime) data.sellerDesk.pricing.proLifetime.button = "Lifetime pass";
        }
        
        fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
      }
    } catch (e) {
    }
  }
});
