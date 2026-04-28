const fs = require('fs');
const path = require('path');

function flatten(obj, prefix = '', result = {}) {
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, result);
    }
  } else {
    result[prefix] = obj;
  }
  return result;
}

const localesDir = path.join(__dirname, 'locales');
const originalEn = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json.original'), 'utf8'));
const currentEn = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

const flatOrig = flatten(originalEn);
const flatCurr = flatten(currentEn);

console.log('Original leaf count:', Object.keys(flatOrig).length);
console.log('Current leaf count:', Object.keys(flatCurr).length);

let changes = {};
for (const [p, currVal] of Object.entries(flatCurr)) {
  const origVal = flatOrig[p];
  if (origVal === undefined || JSON.stringify(origVal) !== JSON.stringify(currVal)) {
    changes[p] = currVal;
  }
}
console.log('Changed keys:', Object.keys(changes).length);
console.log('Sample changes:');
console.log('  nav.aiReplyAssistant:', changes['nav.aiReplyAssistant']);
console.log('  aiReplyAssistant.page.title:', changes['aiReplyAssistant.page.title']);
console.log('  home.projects.aiReplyAssistant.title:', changes['home.projects.aiReplyAssistant.title']);
