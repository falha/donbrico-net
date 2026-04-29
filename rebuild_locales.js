const fs = require('fs');
const path = 'C:/dev/donbrico-net/locales/en.json.original'; // original HEAD backup
// const path = 'C:/dev/donbrico-net/locales/en.json'; // for testing current (should be original)
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// 1. Add nav.aiReplyAssistant
data.nav.aiReplyAssistant = "AI Reply Assistant";

// 2. Add home.projects.aiReplyAssistant
data.home.projects.aiReplyAssistant = {
  badgeChrome: "CHROME EXTENSION",
  badgeFree: "FREE / PRO",
  title: "Donbrico AI Reply Assistant",
  description: "Save reply templates and generate AI-powered responses anywhere. Gmail, LinkedIn, Twitter, support tools — any text field.",
  techStack: "[Chrome Extension] [AI] [Saved Replies] [Free tier]",
  button: "Learn More →"
};

// 3. Add root-level aiReplyAssistant product page object
data.aiReplyAssistant = {
  page: {
    title: "Donbrico AI Reply Assistant — Smart Replies & AI-Powered Responses",
    description: "Build a personal reply library and generate AI-powered responses instantly. Works on Gmail, LinkedIn, Twitter, and any website. Powered by Gemini Nano or your own API key.",
    ogTitle: "Donbrico AI Reply Assistant — Smart Replies & AI-Powered Responses",
    ogDescription: "Build a personal reply library and generate AI-powered responses instantly. Works on Gmail, LinkedIn, Twitter, and any website. Powered by Gemini Nano or your own API key."
  },
  hero: {
    eyebrow: "CHROME EXTENSION",
    title: "Your personal reply library,<br>supercharged with AI.",
    subtitle: "Save unlimited reply templates, generate smart responses with AI, and insert them anywhere — Gmail, LinkedIn, Twitter, support tools, or any website with a text field.",
    disclaimer: "🔒 Your data never leaves your browser · On-device Gemini Nano or your own API key · No account required",
    buttonPrimary: "Add to Chrome — Free",
    buttonSecondary: "See how it works ↓"
  },
  howItWorks: {
    sectionTitle: "How It Works",
    step1: { title: "1. Save your replies", description: "Create a personal library of reply templates. Organise them by category, add searchable tags, use {{variables}} for personalisation (Pro)." },
    step2: { title: "2. Generate with AI", description: "Open the AI Reply toolbar next to any text field. Write a quick prompt, pick a tone (Professional, Friendly, etc.), and let AI draft a reply in seconds." },
    step3: { title: "3. Insert & send", description: "Review, tweak if needed, then insert the reply directly into the page. One less thing to type." }
  },
  features: {
    sectionTitle: "Features that pay for themselves.",
    savedReplies: { title: "Saved reply library", description: "Save up to 30 replies for free, or unlimited with Pro. Search, filter, and insert in one click." },
    aiGeneration: { title: "AI-powered generation", description: "Generate context-aware replies from a short prompt. Free plan includes 10 generations per day; Pro is unlimited." },
    toneSelection: { title: "Tone selection", description: "Choose the right tone: Friendly, Professional, Concise (free) plus Persuasive, Empathetic, Assertive, Follow-up and more (Pro)." },
    geminiNano: { title: "100% private AI", description: "Use Gemini Nano for on-device AI — zero data leaves your machine. Or bring your own key from OpenAI, Anthropic, Groq, or OpenRouter." },
    variables: { title: "Smart variables (Pro)", description: "Use {{placeholders}} like {{name}}, {{company}}, {{date}} to make templates dynamic and personalised." },
    siteAdaptive: { title: "Works everywhere", description: "Built-in adapters for Gmail, LinkedIn, Outlook, Yahoo Mail, and generic form detection. Works on any site with a text field." },
    exportImport: { title: "Export & backup (Pro)", description: "Export your reply library as JSON and import it on another device. Never lose your hard-earned templates." },
    rewriteToolbar: { title: "Rewrite toolbar", description: "Select any text on a page and rewrite it with AI in your chosen tone — perfect for polishing emails and messages." },
    multiProvider: { title: "Multiple AI providers (Pro)", description: "Configure multiple API keys with priority ordering. Fail over automatically if one provider is down." }
  },
  pricing: {
    sectionTitle: "Simple pricing. No hidden costs.",
    free: {
      title: "Free",
      price: "$0",
      features: { f1: "30 saved replies", f2: "10 AI generations / day", f3: "3 basic tones", f4: "Gemini Nano (local, private)", f5: "Single BYOK provider", f6: "Basic site adapters" },
      button: "Add to Chrome"
    },
    proMonthly: {
      title: "Pro — Monthly",
      price: "$6.99/month",
      features: { f1: "Unlimited saved replies", f2: "Unlimited AI generations", f3: "All 10 tones (empathy, sales, executive…)", f4: "Smart variables ({{name}}, {{company}}…)", f5: "Multiple AI providers", f6: "Export / import backups", f7: "All site adapters", f8: "Priority support" },
      button: "Get Pro Monthly"
    },
    proYearly: {
      title: "Pro — Yearly",
      price: "$49.99/year",
      subtitle: "~$4.17/month",
      savings: "Save 40% vs monthly",
      features: { f1: "All Monthly Pro features", f2: "Better long-term value" },
      button: "Get Pro Yearly"
    },
    lifetime: {
      title: "Lifetime — Early Adopter",
      price: "$59.99 one-time",
      earlyAdopter: "(limited to first 100 buyers)",
      features: { f1: "All Pro features, forever", f2: "All future updates included" },
      button: "Get Lifetime",
      disclaimer: ""
    }
  },
  setupGuides: {
    sectionTitle: "AI Setup — Choose Your Power Source",
    subtitle: "Both options are free to start. Gemini Nano runs locally; BYOK gives you flexibility and higher limits.",
    geminiNano: { title: "Gemini Nano (Built Into Chrome)", description: "No API key needed. AI runs entirely on your device via Chrome's built-in Gemini Nano model. 100% private, zero data leaves your browser. Requires Chrome 127+ with sufficient RAM.", button: "View setup guide →" },
    bringYourOwnKey: { title: "Bring Your Own API Key", description: "Connect your own key from OpenAI, Anthropic (Claude), Groq, or OpenRouter. Pay only for what you use. Unlimited AI generations (Pro).", button: "View setup guide →" }
  },
  faq: {
    sectionTitle: "Frequently Asked Questions",
    q1: { question: "Does it work on all websites?", answer: "Yes. The extension detects text fields on any website. Special site-specific adapters unlock extra features on Gmail, LinkedIn, Outlook, and Yahoo Mail, but generic mode works everywhere else." },
    q2: { question: "Is my data private?", answer: "Absolutely. Your saved replies are stored locally in Chrome's storage. When using Gemini Nano, everything stays on your device. If you use a third-party API key, data is sent directly to that provider — Donbrico never sees it." },
    q3: { question: "What's the difference between Free and Pro?", answer: "Free includes 30 saved replies, 10 AI generations per day, 3 basic tones, and single-provider BYOK. Pro removes all limits: unlimited replies and generations, all 10 tones, smart variables, export/import, multiple AI providers, and priority support." },
    q4: { question: "Can I upgrade later?", answer: "Yes. Upgrade anytime. Your saved replies carry over. The lifetime plan is a one-time payment for perpetual Pro access." },
    q5: { question: "How do I import/export my replies?", answer: "Go to Settings in the extension popup. The Export & Import section is available in Pro. Exports are JSON files you can safely store as backups." },
    q6: { question: "What are smart variables?", answer: "Smart variables like {{name}}, {{company}}, and {{date}} get automatically replaced with context-specific values when you insert a reply, making your templates dynamic and personalised (Pro feature)." }
  },
  footer: { links: "Privacy Policy | Support" }
};

// 4. Update home page description to mention AI Reply Assistant
data.home.page.description = "donbrico.net — home of Donbrico Autofill AI, AI Reply Assistant, and Null Carrier. Tools and games built by a solo developer.";
data.home.page.ogDescription = "donbrico.net — home of Donbrico Autofill AI, AI Reply Assistant, and Null Carrier. Tools and games built by a solo developer.";

// 5. PrivacyPolicy: update page meta
data.privacyPolicy.page.description = "Privacy Policy for donbrico.net, Donbrico Autofill AI, AI Reply Assistant Chrome extensions, and Null Carrier.";
data.privacyPolicy.page.ogDescription = "Privacy Policy for donbrico.net, Donbrico Autofill AI, AI Reply Assistant Chrome extensions, and Null Carrier.";

// Add nav sub-menu
data.privacyPolicy.nav = {
  overview: "Overview",
  autofillAi: "Autofill AI Extension",
  aiReplyAssistant: "AI Reply Assistant",
  nullCarrier: "Null Carrier Game",
  website: "This Website",
  contact: "Contact"
};

// Update lastUpdated?
data.privacyPolicy.lastUpdated = "Last updated: February 2026";

// Update overview paragraph
data.privacyPolicy.overview.paragraph = "Donbrico is committed to protecting your privacy. All Donbrico Chrome extensions store data locally on your device. This website does not use analytics, cookies, or any tracking scripts.";

// 6. Add privacyPolicy.aiReplyAssistant section
data.privacyPolicy.aiReplyAssistant = {
  sectionTitle: "Donbrico AI Reply Assistant — Chrome Extension",
  whatWeCollect: { sectionTitle: "What data we collect", paragraph: "None. All saved replies and settings are stored locally in Chrome's storage on your device. No data is transmitted to Donbrico servers." },
  howStored: { sectionTitle: "How your data is stored", paragraph: "Saved replies and templates are stored in Chrome's local storage. If you enable Chrome sync, this data may be synced across your devices via Google's servers — that sync is controlled by Chrome, not by this extension." },
  thirdPartyAI: { sectionTitle: "Third-party AI providers (Bring Your Own Key)", paragraph: "When you use the AI reply generation feature, the text context (the field you're replying to), your selected tone, and any prompt or template variables are sent to your configured AI provider (OpenAI, Anthropic, Groq, or OpenRouter). If you use Gemini Nano (the default), all AI processing occurs on-device and nothing leaves your browser. Donbrico does not store, log, or process any AI requests." },
  permissions: { sectionTitle: "Permissions used", paragraph: "storage (for saved replies and settings), activeTab (to detect text fields), scripting (to inject the reply toolbar), host_permissions (to work on any website you visit)." },
  dataDeletion: { sectionTitle: "Data deletion", paragraph: "Uninstalling the extension deletes all locally stored replies, templates, and settings. No data is retained on Donbrico servers." }
};

// 7. Support page updates: meta descriptions
data.support.page.description = "Get support for Donbrico Autofill AI, AI Reply Assistant, and Null Carrier. Contact us at support@donbrico.net.";
data.support.page.ogDescription = "Get support for Donbrico Autofill AI, AI Reply Assistant, and Null Carrier. Contact us at support@donbrico.net.";

// 8. Add support.aiReplyAssistant block after autofill
data.support.aiReplyAssistant = {
  sectionTitle: "Donbrico AI Reply Assistant Support",
  subtitle: "Common Issues",
  q1: { question: "The extension toolbar isn't appearing on a page", answer: "Make sure you're on a page with a text field (input or textarea). Click inside the field first — the AI Reply toolbar should appear near the field. If it doesn't, refresh the page and try again." },
  q2: { question: "My saved replies aren't showing up", answer: "Check that you've saved replies in the Library tab of the extension popup. If you recently re-installed, replies stored locally are gone unless you exported a backup (Pro feature)." },
  q3: { question: "Gemini Nano says 'Not supported on this device'", answer: "Gemini Nano requires Chrome 127+ with sufficient RAM (typically 8GB+). You can still use the extension by adding your own API key in Settings (Bring Your Own Key). Supported providers: OpenAI, Anthropic, Groq, OpenRouter." },
  q4: { question: "AI-generated replies sound generic or off-topic", answer: "The AI uses the text field's context plus your selected tone. For best results, use specific prompts and set a detailed tone. If using a BYOK provider, try switching to a different model." },
  q5: { question: "How do I uninstall and remove my data?", answer: "In Chrome, go to chrome://extensions, find Donbrico AI Reply Assistant, click Remove. This deletes all locally stored replies and settings." },
  q6: { question: "How do I report a bug or request a feature?", answer: "Email support@donbrico.net with 'Bug:' or 'Feature Request:' at the start of your subject line." }
};

// Write the updated JSON to the actual en.json
fs.writeFileSync('C:/dev/donbrico-net/locales/en.json', JSON.stringify(data, null, 2) + '\n');
console.log('Done. File written.');
