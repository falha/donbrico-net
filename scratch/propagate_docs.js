const fs = require('fs');
const path = require('path');

const localesDir = 'c:/dev/donbrico-net/locales';
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const targetLangs = ['es', 'ja', 'pt_BR', 'fr', 'de', 'it', 'zh_CN', 'zh_TW', 'hi', 'ru', 'ko'];

const translations = {
  es: { title: "Guía de Claves API", nav: "Gemini Nano", badge: "Guía de Configuración", h1: "Obtén tus <em>Claves API</em>" },
  ja: { title: "APIキーガイド", nav: "Gemini Nano", badge: "セットアップガイド", h1: "<em>APIキー</em>を取得する" },
  pt_BR: { title: "Guia de Chaves API", nav: "Gemini Nano", badge: "Guia de Configuração", h1: "Obtenha suas <em>Chaves API</em>" },
  fr: { title: "Guide des Clés API", nav: "Gemini Nano", badge: "Guide de Configuration", h1: "Obtenez vos <em>Clés API</em>" },
  de: { title: "API-Schlüssel Leitfaden", nav: "Gemini Nano", badge: "Einrichtungsleitfaden", h1: "Holen Sie sich Ihre <em>API-Schlüssel</em>" },
  it: { title: "Guida alle Chiavi API", nav: "Gemini Nano", badge: "Guida alla Configurazione", h1: "Ottieni le tue <em>Chiavi API</em>" },
  zh_CN: { title: "API 密钥指南", nav: "Gemini Nano", badge: "设置指南", h1: "获取您的 <em>API 密钥</em>" },
  zh_TW: { title: "API 金鑰指南", nav: "Gemini Nano", badge: "設定指南", h1: "獲取您的 <em>API 金鑰</em>" },
  hi: { title: "API कुंजी गाइड", nav: "Gemini Nano", badge: "सेटअप गाइड", h1: "अपनी <em>API कुंजियाँ</em> प्राप्त करें" },
  ru: { title: "Руководство по API-ключам", nav: "Gemini Nano", badge: "Руководство по настройке", h1: "Получите свои <em>API-ключи</em>" },
  ko: { title: "API 키 가이드", nav: "Gemini Nano", badge: "설정 가이드", h1: "<em>API 키</em> 가져오기" }
};

for (const lang of targetLangs) {
  const filePath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) continue;

  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`Error parsing ${lang}.json: ${e.message}`);
    continue;
  }
  
  // Propagate docs.apiKeys
  data.docs = data.docs || {};
  data.docs.apiKeys = JSON.parse(JSON.stringify(en.docs.apiKeys));
  
  // Propagate nav keys if missing
  data.nav = data.nav || {};
  data.nav.geminiNano = translations[lang].nav;
  if (!data.nav.home) data.nav.home = en.nav.home;
  if (!data.nav.product) data.nav.product = en.nav.product;
  if (!data.nav.autofillAi) data.nav.autofillAi = en.nav.autofillAi;
  if (!data.nav.aiReplyAssistant) data.nav.aiReplyAssistant = en.nav.aiReplyAssistant;
  if (!data.nav.workDesk) data.nav.workDesk = en.nav.workDesk;
  if (!data.nav.nullCarrier) data.nav.nullCarrier = en.nav.nullCarrier;
  if (!data.nav.privacyPolicy) data.nav.privacyPolicy = en.nav.privacyPolicy;
  if (!data.nav.termsOfService) data.nav.termsOfService = en.nav.termsOfService;
  if (!data.nav.support) data.nav.support = en.nav.support;

  // Translate titles and headers
  const t = translations[lang];
  data.docs.apiKeys.page.title = t.title + " — Donbrico Autofill AI";
  data.docs.apiKeys.breadcrumb.title = t.title;
  data.docs.apiKeys.header.badge = t.badge;
  data.docs.apiKeys.header.title = t.h1;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  console.log(`Updated ${lang}.json`);
}
