#!/usr/bin/env node
/**
 * Apply AI Reply Assistant translations to all locale files.
 * Uses Google Translate free API (client=gtx) with rate limiting.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const localesDir = path.join(__dirname, 'locales');

// ---------- Helper Functions ----------

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

function setDeep(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

function extractPlaceholders(text) {
  const placeholders = [];
  const protectedText = text.replace(/(\{\{[^}]+\}\}|<br\s*\/?>)/gi, (match) => {
    const token = `__PLH_${placeholders.length}__`;
    placeholders.push(match);
    return token;
  });
  return { protectedText, placeholders };
}

function restorePlaceholders(text, placeholders) {
  return text.replace(/__PLH_(\d+)__/g, (_, idx) => placeholders[parseInt(idx, 10)]);
}

const translateCache = {};

async function translateString(text, lang) {
  if (!text) return text;
  const cacheKey = `${lang}|${text}`;
  if (translateCache.hasOwnProperty(cacheKey)) return translateCache[cacheKey];

  const { protectedText, placeholders } = extractPlaceholders(text);
  if (!protectedText) return text;

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(protectedText)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    let translated = data[0][0][0];
    translated = restorePlaceholders(translated, placeholders);
    translateCache[cacheKey] = translated;
    return translated;
  } catch (e) {
    console.error(`  ⚠ Translation error (${lang}): ${e.message}. Using English fallback.`);
    translateCache[cacheKey] = text;
    return text;
  }
}

// Paths that should remain in English (product names)
const skipTranslatePaths = new Set([
  'nav.aiReplyAssistant',
  'home.projects.aiReplyAssistant.title',
  'aiReplyAssistant.page.title',
  'aiReplyAssistant.page.ogTitle',
  'nav.extensionsPropertyFill',
  'propertyFillAi.page.title',
  'propertyFillAi.page.ogTitle',
  'nav.extensionsSellerDesk',
  'sellerDesk.page.title',
  'nav.extensionsRecruitReply',
  'recruitReply.page.title',
  'recruitReply.page.ogTitle',
]);

// ---------- Main ----------
(async () => {
  // Load original en.json (before AI Reply Assistant additions)
  let originalEnContent;
  const backupPath = path.join(localesDir, 'en.json.original');
  if (fs.existsSync(backupPath)) {
    originalEnContent = fs.readFileSync(backupPath, 'utf8');
    console.log('✓ Original en.json loaded from backup file (en.json.original)');
  } else {
    try {
      originalEnContent = execSync('git show HEAD:locales/en.json', { encoding: 'utf8' });
      console.log('✓ Original en.json loaded from git HEAD');
    } catch (e) {
      console.error('✗ Could not obtain original en.json. Ensure backup or git repo exists.');
      process.exit(1);
    }
  }

  const currentEnContent = fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8');

  const originalEn = JSON.parse(originalEnContent);
  const currentEn = JSON.parse(currentEnContent);

  // Compute changed/new keys
  const flatOrig = flatten(originalEn);
  const flatCurr = flatten(currentEn);

  console.log(`  Original leaf count: ${Object.keys(flatOrig).length}`);
  console.log(`  Current leaf count: ${Object.keys(flatCurr).length}`);

  const changes = {};
  for (const [path, currVal] of Object.entries(flatCurr)) {
    const origVal = flatOrig[path];
    if (origVal === undefined || JSON.stringify(origVal) !== JSON.stringify(currVal)) {
      changes[path] = currVal;
    }
  }

  const changePaths = Object.keys(changes);
  console.log(`→ Found ${changePaths.length} changed/new translation keys to propagate`);

  // Target languages (exclude 'en')
  const targetLangs = ['es', 'ja', 'pt_BR', 'fr', 'de', 'it', 'zh_CN', 'zh_TW', 'hi', 'ru', 'ko'];

  // Process each language
  for (const lang of targetLangs) {
    const filePath = path.join(localesDir, `${lang}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠ File not found: ${lang}.json, skipping`);
      continue;
    }

    console.log(`\nProcessing ${lang}.json...`);
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Translate and apply each change
    for (let i = 0; i < changePaths.length; i++) {
      const p = changePaths[i];
      const enVal = changes[p];
      let localizedVal;
      if (skipTranslatePaths.has(p)) {
        localizedVal = enVal; // keep English for product names
      } else {
        localizedVal = await translateString(enVal, lang);
      }
      setDeep(data, p, localizedVal);
      // Rate limit: 150ms pause between translations
      await new Promise(r => setTimeout(r, 150));
    }

    // Write updated JSON with 2-space indentation
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`✅ Updated ${lang}.json`);
  }

  console.log('\n🎉 All translations applied!');
})();