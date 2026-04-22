/**
 * Donbrico Localization System
 * Supports: en, es, ja, pt_BR, fr, de, it, zh_CN, zh_TW, hi, ru, ko
 */

const i18next = {
  availableLanguages: {
    'en': 'English',
    'es': 'Español',
    'ja': '日本語',
    'pt_BR': 'Português (Brasil)',
    'fr': 'Français',
    'de': 'Deutsch',
    'it': 'Italiano',
    'zh_CN': '中文 (简体)',
    'zh_TW': '中文 (繁體)',
    'hi': 'हिन्दी',
    'ru': 'Русский',
    'ko': '한국어'
  },
  
  translations: {},
  
  currentLang: 'en',
  
  /**
   * Get the base path to reach site root from current page
   * Handles both root-level pages and subdirectory pages
   */
  getBasePath() {
    const path = window.location.pathname;
    // Split path into segments, filter empty
    const segments = path.split('/').filter(seg => seg && !seg.endsWith('.html'));
    // If we have any segments, we're in a subdirectory, need to go up
    if (segments.length > 0) {
      return '../'.repeat(segments.length);
    }
    return './';
  },
  
  /**
   * Detect user's preferred language from browser
   */
  detectLanguage() {
    // Check localStorage first
    const saved = localStorage.getItem('donbrico-lang');
    if (saved && this.availableLanguages[saved]) {
      return saved;
    }
    
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && this.availableLanguages[urlLang]) {
      return urlLang;
    }
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Map browser languages to our supported languages
    const langMap = {
      'es': ['es-ES', 'es-MX', 'es-AR', 'es-CO', 'es-CL', 'es-PE', 'es-VE'],
      'ja': ['ja-JP'],
      'pt_BR': ['pt-BR'],
      'fr': ['fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'],
      'de': ['de-DE', 'de-AT', 'de-CH'],
      'it': ['it-IT', 'it-CH'],
      'zh_CN': ['zh-CN', 'zh-SG'],
      'zh_TW': ['zh-TW', 'zh-HK', 'zh-MO'],
      'hi': ['hi-IN'],
      'ru': ['ru-RU'],
      'ko': ['ko-KR']
    };
    
    // Exact match first
    if (this.availableLanguages[browserLang]) {
      return browserLang;
    }
    
    // Check mapped languages
    for (const [lang, variants] of Object.entries(langMap)) {
      if (variants.includes(browserLang)) {
        return lang;
      }
    }
    
    // Partial match (e.g., 'es' from 'es-MX')
    const primaryLang = browserLang.split('-')[0];
    if (this.availableLanguages[primaryLang]) {
      return primaryLang;
    }
    
    return 'en'; // default fallback
  },
  
  /**
   * Load translation file for given language
   */
  async loadTranslations(lang) {
    try {
      const basePath = this.getBasePath();
      const response = await fetch(`${basePath}locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.translations[lang] = await response.json();
    } catch (error) {
      console.warn(`Failed to load translations for ${lang}:`, error);
      // Fallback to English
      if (lang !== 'en') {
        await this.loadTranslations('en');
      } else {
        this.translations['en'] = {};
      }
     }
   },
   
   /**
    * Detect user's preferred language from browser
    */
  detectLanguage() {
    // Check localStorage first
    const saved = localStorage.getItem('donbrico-lang');
    if (saved && this.availableLanguages[saved]) {
      return saved;
    }
    
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && this.availableLanguages[urlLang]) {
      return urlLang;
    }
    
    // Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Map browser languages to our supported languages
    const langMap = {
      'es': ['es-ES', 'es-MX', 'es-AR', 'es-CO', 'es-CL', 'es-PE', 'es-VE'],
      'ja': ['ja-JP'],
      'pt_BR': ['pt-BR'],
      'fr': ['fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'],
      'de': ['de-DE', 'de-AT', 'de-CH'],
      'it': ['it-IT', 'it-CH'],
      'zh_CN': ['zh-CN', 'zh-SG'],
      'zh_TW': ['zh-TW', 'zh-HK', 'zh-MO'],
      'hi': ['hi-IN'],
      'ru': ['ru-RU'],
      'ko': ['ko-KR']
    };
    
    // Exact match first
    if (this.availableLanguages[browserLang]) {
      return browserLang;
    }
    
    // Check mapped languages
    for (const [lang, variants] of Object.entries(langMap)) {
      if (variants.includes(browserLang)) {
        return lang;
      }
    }
    
    // Partial match (e.g., 'es' from 'es-MX')
    const primaryLang = browserLang.split('-')[0];
    if (this.availableLanguages[primaryLang]) {
      return primaryLang;
    }
    
    return 'en'; // default fallback
  },
  
  /**
   * Load translation file for given language
   */
  async loadTranslations(lang) {
    try {
      const basePath = this.getBasePath();
      const response = await fetch(`${basePath}locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.translations[lang] = await response.json();
    } catch (error) {
      console.warn(`Failed to load translations for ${lang}:`, error);
      // Fallback to English
      if (lang !== 'en') {
        await this.loadTranslations('en');
      } else {
        this.translations['en'] = {};
      }
    }
  },
  
  /**
   * Get translation for a key (e.g., "home.hero.title")
   */
  t(key, lang = null) {
    const language = lang || this.currentLang;
    const keys = key.split('.');
    let value = this.translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = null;
        break;
      }
    }
    
    // Fallback to English if translation missing
    if (value === null && language !== 'en') {
      return this.t(key, 'en');
    }
    
    // Return key itself if still missing (helps spot missing translations)
    return value !== null ? value : `[${key}]`;
  },
  
  /**
   * Initialize i18n system
   */
  async init() {
    // Detect language
    this.currentLang = this.detectLanguage();
    localStorage.setItem('donbrico-lang', this.currentLang);
    
    // Load all translation files in parallel
    const loadPromises = Object.keys(this.availableLanguages).map(lang => 
      this.loadTranslations(lang)
    );
    await Promise.all(loadPromises);
    
    // Apply translations to page
    this.translatePage();
    
    // Create language switcher UI
    this.createLanguageSwitcher();
    
    console.log(`i18n initialized: ${this.currentLang}`);
  },
  
  /**
   * Translate all elements with data-i18n attributes
   */
  translatePage() {
    // Translate elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else if (el.tagName === 'META' || el.tagName === 'TITLE') {
        el.textContent = translation;
      } else {
        el.innerHTML = translation;
      }
    });
    
    // Translate page title separately
    const pageTitle = document.querySelector('title[data-i18n]');
    if (pageTitle) {
      pageTitle.textContent = this.t('page.title');
    }
    
    // Translate meta descriptions
    const metaDesc = document.querySelector('meta[name="description"][data-i18n]');
    if (metaDesc) {
      metaDesc.setAttribute('content', this.t('page.description'));
    }
    
    // Translate Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"][data-i18n]');
    if (ogTitle) {
      ogTitle.setAttribute('content', this.t('page.ogTitle'));
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"][data-i18n]');
    if (ogDesc) {
      ogDesc.setAttribute('content', this.t('page.ogDescription'));
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang;
    
    // Translate footer copyright year (dynamic)
    const yearEl = document.querySelector('[data-i18n="app.copyright"]');
    if (yearEl) {
      const currentYear = new Date().getFullYear();
      const template = this.t('app.copyright');
      yearEl.textContent = template.replace('2026', currentYear);
    }
  },
  
  /**
   * Create language switcher dropdown - minimal incognito style, inline in nav
   */
  createLanguageSwitcher() {
    // Check if switcher already exists
    if (document.querySelector('.lang-switcher')) return;
    
    const select = document.createElement('select');
    select.className = 'lang-switcher';
    select.setAttribute('aria-label', 'Language selector');
    select.setAttribute('title', 'Select Language / 选择语言 / Sélectionner la langue');
    
    Object.entries(this.availableLanguages).forEach(([code, name]) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = name;
      if (code === this.currentLang) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    
    select.addEventListener('change', (e) => {
      this.switchLanguage(e.target.value);
    });
    
    // Minimal incognito styling - inline with nav
    select.style.cssText = `
      background: transparent;
      color: var(--text-color, #e8e8f0);
      border: none;
      padding: 6px 10px;
      font-family: inherit;
      font-size: 0.9rem;
      cursor: pointer;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23e8e8f0' viewBox='0 0 16 16'%3E%3Cpath d='m4.7 6.3 3.3 3.3 3.3-3.3.7.7-4,4-4-4z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0 center;
      padding-right: 20px;
    `;
    
    // Insert after the Support nav link
    const supportLink = document.querySelector('.nav-links li:last-child a');
    if (supportLink) {
      const li = document.createElement('li');
      li.className = 'nav-lang';
      li.appendChild(select);
      const ul = supportLink.parentNode.parentNode; // ul.nav-links
      ul.appendChild(li);
    } else {
      document.body.appendChild(select);
    }
  },
  
  /**
   * Switch to a different language
   */
  switchLanguage(lang) {
    if (!this.availableLanguages[lang]) return;
    
    this.currentLang = lang;
    localStorage.setItem('donbrico-lang', lang);
    this.translatePage();
    
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
    
    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18next.init());
} else {
  i18next.init();
}

// Expose globally for debugging
window.i18n = i18next;
