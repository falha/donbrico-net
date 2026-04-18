# Donbrico Localization System

## Overview

The site uses a custom lightweight i18n system supporting **12 languages**:

- English (en) - default
- Spanish (es)
- Japanese (ja)
- Portuguese Brazilian (pt_BR)
- French (fr)
- German (de)
- Italian (it)
- Chinese Simplified (zh_CN)
- Chinese Traditional (zh_TW)
- Hindi (hi)
- Russian (ru)
- Korean (ko)

## File Structure

```
locales/
├── en.json          # English (baseline)
├── es.json          # Spanish
├── ja.json          # Japanese
├── pt_BR.json       # Portuguese (Brazil)
├── fr.json          # French
├── de.json          # German
├── it.json          # Italian
├── zh_CN.json       # Chinese Simplified
├── zh_TW.json       # Chinese Traditional
├── hi.json          # Hindi
├── ru.json          # Russian
└── ko.json          # Korean

js/
└── i18n.js          # Translation engine

css/
└── style.css        # Includes text expansion handling
```

## Adding Translations

### 1. Use `data-i18n` Attributes

In HTML files, add `data-i18n="key.path"` to any element that should be translated:

```html
<h1 data-i18n="home.hero.title">Tools that work.<br>Games that think.</h1>
<p data-i18n="nav.home">Home</p>
<a href="/" data-i18n="app.name">Donbrico Studio</a>
```

### 2. Key Structure

Keys use dot notation to organize content by page and section:

- `app.*` - App-wide (name, copyright)
- `nav.*` - Navigation labels
- `home.*` - Home page content
- `autofillAi.*` - Autofill AI page
- `nullCarrier.*` - Null Carrier page
- `support.*` - Support page
- `privacyPolicy.*` - Privacy Policy page

### 3. Translation Files

Each locale file is a JSON object mirroring the key structure:

```json
{
  "app": {
    "name": "Donbrico Studio",
    "copyright": "© 2026 Donbrico Studio. All rights reserved."
  },
  "nav": {
    "home": "Home",
    "autofillAi": "Autofill AI"
  }
}
```

**Important:** All translation files must be valid JSON and maintain the same key structure as `en.json`.

## Language Detection

The system automatically detects user language in this order:

1. **localStorage** - previously selected language (persisted)
2. **URL parameter** - `?lang=xx` (e.g., `?lang=es`)
3. **Browser language** - matches `navigator.language`
4. **Fallback** - English (en)

## Language Switcher

A floating dropdown appears in the bottom-right corner. Users can switch languages at any time. The selection is saved to localStorage and updates the URL without page reload.

## Text Expansion Handling

CSS includes accommodations for languages that expand (e.g., German/Spanish +20-30%):

```css
.btn {
  white-space: normal;
  word-break: break-word;
}

.nav .nav-links a {
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## Adding a New Language

1. Copy `locales/en.json` to `locales/xx.json` (where `xx` is the language code)
2. Translate all values (keep the keys unchanged)
3. Add the language code to `i18next.availableLanguages` in `js/i18n.js`
4. Add flag emoji to `createLanguageSwitcher()` if desired
5. Test by adding `?lang=xx` to URL

## Best Practices

- **UTF-8 encoding** — All files must be UTF-8 (especially for CJK, Hindi, Arabic)
- **No placeholders in keys** — Keys should be static; variable interpolation happens in JS if needed
- **Keep structure identical** — All locale files must have the same nested structure
- **Test layout** — Some languages expand; verify buttons and nav don't break
- **Review translations** — Machine translations may need native speaker review

## Dynamic Content

For dynamic content (dates, numbers, currency), use the browser's `Intl` API with `i18next.currentLang`:

```js
const date = new Date();
const formatted = new Intl.DateTimeFormat(i18next.currentLang, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(date);
```

## FAQ

**Q: Why not use i18next library?**
A: Custom lightweight implementation avoids external dependencies. Full features (pluralization, nesting) not needed for this site.

**Q: How do I update translations?**
A: Edit the appropriate `locales/xx.json` file. The system hot-reloads when you switch languages.

**Q: What about RTL languages?**
A: Not currently needed. If adding RTL (Arabic, Hebrew), add `dir="rtl"` to `<html>` tag in the translation system.

**Q: Are emojis translated?**
A: Emojis are language-neutral and kept in English. Localizers may replace culturally appropriate symbols if needed.

**Q: How do I test all languages?**
A: Append `?lang=xx` to any page URL (e.g., `index.html?lang=de`). The switcher also works.
