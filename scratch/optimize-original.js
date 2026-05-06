
const fs = require('fs');
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
delete en.docs.apiKeys;
delete en.docs.geminiNano;
fs.writeFileSync('locales/en.json.original', JSON.stringify(en, null, 2) + '\n');
console.log('en.json.original updated');
