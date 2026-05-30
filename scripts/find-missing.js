const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'locales');
const enPath = path.join(localesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const langs = ['es', 'ja', 'pt_BR', 'fr', 'de', 'it', 'zh_CN', 'zh_TW', 'hi', 'ru', 'ko'];

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const k in obj) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      keys = keys.concat(getKeys(obj[k], key));
    } else {
      keys.push(key);
    }
  }
  return keys;
}

const enKeys = getKeys(enData);
let missing = {};

langs.forEach(lang => {
  const langPath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(langPath)) return;
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
  const langKeys = new Set(getKeys(langData));
  
  const missingForLang = enKeys.filter(k => !langKeys.has(k) && (k.startsWith('nav.') || k.startsWith('footer.')));
  if (missingForLang.length > 0) {
    missing[lang] = missingForLang;
  }
});

console.log(JSON.stringify(missing, null, 2));
