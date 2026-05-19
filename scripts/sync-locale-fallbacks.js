#!/usr/bin/env node
/**
 * Sync English fallback text into HTML for elements with data-i18n.
 * Only fills elements that are empty or whitespace-only (crawler-visible fix).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LOCALE_PATH = path.join(ROOT, "locales", "en.json");

function loadLocale() {
  return JSON.parse(fs.readFileSync(LOCALE_PATH, "utf8"));
}

function getNested(obj, keyPath) {
  const keys = keyPath.split(".");
  let value = obj;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return null;
    }
  }
  if (typeof value !== "string") return null;
  return value;
}

function localeToHtml(text) {
  return text.replace(/<br\s*\/?>/gi, "<br />");
}

function walkHtmlFiles(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === ".wrangler" || name === "scripts") continue;
      walkHtmlFiles(full, files);
    } else if (name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function syncFile(filePath, locale) {
  let html = fs.readFileSync(filePath, "utf8");
  let changed = 0;

  // Elements: <tag ... data-i18n="key">optional content</tag>
  html = html.replace(
    /<(\w+)([^>]*\sdata-i18n="([^"]+)"[^>]*)(?:\/>|>([\s\S]*?)<\/\1>)/gi,
    (match, tag, attrs, i18nKey, inner) => {
      if (tag.toLowerCase() === "meta") return match;
      const trimmed = (inner || "").trim();
      if (trimmed.length > 0) return match;

      const value = getNested(locale, i18nKey);
      if (!value) return match;

      const htmlValue = localeToHtml(value);
      changed++;
      return `<${tag}${attrs}>${htmlValue}</${tag}>`;
    },
  );

  // Meta / elements with content="" and data-i18n
  html = html.replace(
    /<meta([^>]*\sdata-i18n="([^"]+)"[^>]*\scontent="")([^>]*)\/?>/gi,
    (match, before, i18nKey, after) => {
      const value = getNested(locale, i18nKey);
      if (!value) return match;
      changed++;
      const escaped = value.replace(/"/g, "&quot;");
      return `<meta${before}content="${escaped}"${after}/>`;
    },
  );

  if (changed > 0) {
    fs.writeFileSync(filePath, html, "utf8");
    console.log(`${path.relative(ROOT, filePath)}: ${changed} fallbacks synced`);
  }
  return changed;
}

const locale = loadLocale();
const files = walkHtmlFiles(ROOT);
let total = 0;
for (const file of files) {
  total += syncFile(file, locale);
}
console.log(`Done. ${total} elements updated.`);
