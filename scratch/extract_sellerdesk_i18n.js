const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'seller-desk', 'index.html');
const localesDir = path.join(__dirname, '..', 'locales');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Regex to capture data-i18n="sellerDesk.something" and the innerHTML or content=""
// Wait, regex for HTML is brittle, but since it's well-formatted, we can do it.
// Let's do simple matching: data-i18n="([^"]+)"\s*(?:content="([^"]*)")?(?:>([\s\S]*?)<\/\w+>)?
const regex = /data-i18n="([^"]+)"(?:[^>]*content="([^"]*)")?(?:[^>]*>([\s\S]*?)<\/(?:[a-zA-Z0-9]+)>)?/g;

const sellerDeskKeys = {};

function setNested(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

let match;
while ((match = regex.exec(htmlContent)) !== null) {
  const key = match[1];
  if (key.startsWith('sellerDesk.')) {
    let text = match[3];
    if (match[2]) {
      text = match[2]; // fallback to content="" for meta tags
    }
    
    if (text) {
      // Clean up text
      text = text.replace(/<br\s*\/?>/gi, '<br />').replace(/\s+/g, ' ').trim();
      setNested(sellerDeskKeys, key, text);
    }
  }
}

// We also manually need to ensure some specific structure if regex misses
console.log(JSON.stringify(sellerDeskKeys, null, 2));

const files = fs.readdirSync(localesDir);
files.forEach(file => {
  if (file.endsWith('.json')) {
    const localePath = path.join(localesDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(localePath, 'utf8'));
      
      // Inject sellerDesk object if not fully present
      if (!data.sellerDesk || Object.keys(data.sellerDesk).length < 2) {
        data.sellerDesk = sellerDeskKeys.sellerDesk;
        fs.writeFileSync(localePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Updated', file);
      }
    } catch (e) {
      console.error('Error on', file);
    }
  }
});
