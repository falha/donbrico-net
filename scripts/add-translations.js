const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'locales');
const langs = ['es', 'ja', 'pt_BR', 'fr', 'de', 'it', 'zh_CN', 'zh_TW', 'hi', 'ru', 'ko'];

const translations = {
  products: {
    es: "Productos",
    fr: "Produits",
    ja: "製品",
    pt_BR: "Produtos",
    de: "Produkte",
    it: "Prodotti",
    zh_CN: "产品",
    zh_TW: "產品",
    hi: "उत्पाद",
    ru: "Продукты",
    ko: "제품"
  },
  tools: {
    ja: "ツール",
    pt_BR: "Ferramentas",
    de: "Werkzeuge",
    it: "Strumenti",
    zh_CN: "工具",
    zh_TW: "工具",
    hi: "उपकरण",
    ru: "Инструменты",
    ko: "도구"
  }
};

langs.forEach(lang => {
  const langPath = path.join(localesDir, `${lang}.json`);
  if (!fs.existsSync(langPath)) return;
  const data = JSON.parse(fs.readFileSync(langPath, 'utf8'));
  
  if (!data.nav) data.nav = {};
  
  if (translations.products[lang]) {
    data.nav.products = translations.products[lang];
  }
  
  if (translations.tools[lang]) {
    data.nav.tools = translations.tools[lang];
  }
  
  // The whisperer tools are proper nouns, keep as is if missing
  const names = ['FileWhisperer', 'ReceiptWhisperer', 'MeetingWhisperer'];
  names.forEach(name => {
    const key = `tools${name}`;
    if (!data.nav[key]) {
      data.nav[key] = `${name} AI`;
    }
  });

  fs.writeFileSync(langPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
});

console.log("Translations added.");
