#!/usr/bin/env node
/**
 * Fix translated titles for AI Reply Assistant page (translate tagline only, keep product name in English)
 */

const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');
const targetLangs = ['es', 'ja', 'pt_BR', 'fr', 'de', 'it', 'zh_CN', 'zh_TW', 'hi', 'ru', 'ko'];

const PRODUCT_NAME = 'Donbrico AI Reply Assistant';
const TITLE_SEPARATOR = ' — ';

async function translateString(text, lang) {
  // Simple Google Translate via fetch
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0][0][0];
  } catch (e) {
    console.error(`  ⚠ Error translating to ${lang}: ${e.message}`);
    return text; // fallback
  }
}

(async () => {
  for (const lang of targetLangs) {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) continue;

    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Ensure aiReplyAssistant block exists
    if (!data.aiReplyAssistant) {
      console.log(`⚠ ${lang}.json missing aiReplyAssistant block, skipping`);
      continue;
    }

    let changed = false;
    // Handle title and ogTitle inside aiReplyAssistant.page
    const pageBlock = data.aiReplyAssistant.page || {};
    for (const key of ['title', 'ogTitle']) {
      const fullEn = pageBlock[key];
      if (!fullEn) continue;
      if (fullEn.includes(PRODUCT_NAME + TITLE_SEPARATOR)) {
        const parts = fullEn.split(TITLE_SEPARATOR);
        if (parts.length === 2) {
          const tagline = parts[1];
          const translatedTagline = await translateString(tagline, lang);
          const newTitle = PRODUCT_NAME + TITLE_SEPARATOR + translatedTagline;
          if (pageBlock[key] !== newTitle) {
            pageBlock[key] = newTitle;
            changed = true;
          }
        }
      }
    }
    // reassign back (since object reference)
    data.aiReplyAssistant.page = pageBlock;

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
      console.log(`✅ Fixed titles for ${lang}.json`);
    } else {
      console.log(`ℹ No title change needed for ${lang}.json (maybe already translated?)`);
    }

    // Be nice to API
    await new Promise(r => setTimeout(r, 100));
  }

  console.log('\n✅ Title fix complete');
})();
