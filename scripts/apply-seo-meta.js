#!/usr/bin/env node
/**
 * Apply SEO title/description updates from audit to locales/en.json and HTML fallbacks.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const LOCALE_PATH = path.join(ROOT, "locales", "en.json");

/** @type {Record<string, { title: string; description: string }>} */
const SEO_UPDATES = {
  "home.page": {
    title: "AI Browser Extensions for Automation & Writing | Donbrico",
    description:
      "Automate writing, form filling, and tab management with AI browser extensions. Save time on repetitive work—data stays local. Try Donbrico free.",
  },
  "autofillAi.page": {
    title: "Autofill AI — Best AI Form Filler for Job Applications & Chrome",
    description:
      "Best AI form filler for job applications & medical forms. Private autofill for Chrome — no data collection. Fill any form in one click. Free extension.",
  },
  "medAutoFill.page": {
    title: "MedAutoFill — Best Chrome Extension for Medical Forms",
    description:
      "Best Chrome extension for medical forms. Autofill prior authorization, insurance claim, and patient intake forms. Local AI keeps data in your browser.",
  },
  "aiReplyAssistant.page": {
    title: "AI Reply Generator for Gmail & Outlook – Chrome Extension",
    description:
      "Best AI tool for customer support responses. Automate email replies without templates on Gmail, Outlook & any website. Add to Chrome free.",
  },
  "hostReply.page": {
    title: "HostReply AI – Reply to Airbnb Guests in Seconds (Free Chrome Extension)",
    description:
      "Reply to Airbnb and Vrbo guests in seconds. HostReply AI drafts professional messages inside your inbox. Free Chrome extension with Host Memory.",
  },
  "workDesk.page": {
    title: "Save & Restore Browser Tabs | AI Workspace Manager for Chrome",
    description:
      "Save and restore browser workspaces instantly. AI organizes tabs by project. No account needed. Free Chrome extension to manage sessions.",
  },
  "tradeDesk.page": {
    title: "AI Reply Assistant for Contractors — Draft Quotes & Estimates",
    description:
      "AI reply assistant for contractors. Draft professional quotes for HVAC jobs and estimates from notes instantly. Free Chrome extension for trades.",
  },
  "extensions.page": {
    title: "AI Browser Extensions for Productivity | Donbrico",
    description:
      "Download free AI browser extensions for writing, form autofill, and workflow automation. Privacy-first tools that boost your browser productivity.",
  },
  "about.page": {
    title: "AI Browser Extension for Workflow Automation | Donbrico",
    description:
      "Donbrico builds AI browser extensions that automate repetitive tasks, boost productivity, and streamline workflows for professionals and teams. Try it free.",
  },
  "support.page": {
    title: "Support & Help Center — Donbrico Autofill AI & AI Reply Assistant",
    description:
      "Get fast support for Donbrico Autofill AI, AI Reply Assistant, and Null Carrier. Our solo team reads every message. Contact us today.",
  },
  "privacyPolicy.page": {
    title: "Privacy Policy – Donbrico AI Autofill & Reply Assistant",
    description:
      "Learn how Donbrico protects your data across Autofill AI, Reply Assistant, and Null Carrier. Transparent privacy for your peace of mind.",
  },
  "terms.page": {
    title: "Terms of Service — Donbrico Studio | Browser Extensions & Games",
    description:
      "Read Donbrico Studio's Terms of Service for browser extensions, AI tools, and games. Learn your rights, payment terms, and AI usage policies.",
  },
  "nullCarrier.page": {
    title: "Donbrico: Null Carrier — Atmospheric Puzzle Game | Steam",
    description:
      "Donbrico: Null Carrier — Operate a deep-space listening array. Tune frequencies, reconstruct signals. Wishlist now on Steam. Coming soon.",
  },
  "solutions.page": {
    title: "Browser Workflow Automation & AI Tools | Donbrico",
    description:
      "Automate repetitive browser tasks with Donbrico's AI workflow tools. Save time on forms, data entry & communication. Install free extensions.",
  },
  "solutions.automation.page": {
    title: "Donbrico: AI Form Filling & Workflow Automation",
    description:
      "Automate repetitive form filling and data entry across any website. Donbrico AI saves hours for recruiters, admins, and ops teams. Try free.",
  },
  "solutions.communication.page": {
    title: "AI Reply Assistant: Automate Emails & Messages | Donbrico",
    description:
      "Automate replies, emails, and messages with AI. Built for support teams and sales pros. Works in Gmail, LinkedIn, and more. Free Chrome extension.",
  },
  "solutions.workspace.page": {
    title: "AI Browser Workspace Manager – Save Tabs & Sessions | Donbrico",
    description:
      "Organize tabs, save browser sessions, and boost productivity with Donbrico's AI workspace manager. Restore your research instantly. Free Chrome extension.",
  },
  "solutions.browserWorkspace.page": {
    title: "AI Browser Workspace Manager for Structured Workflows | Donbrico",
    description:
      "Save and organize browser sessions with AI. Ideal for researchers and developers managing complex workflows. Try Donbrico WorkDesk free.",
  },
  "solutions.jobSeekers.page": {
    title: "Autofill Job Applications with AI — Donbrico",
    description:
      "Stop retyping your resume. Donbrico AI autofills job forms, writes cover letters, and handles ATS data entry. Apply 10x faster — free Chrome extension.",
  },
  "solutions.recruiters.page": {
    title: "AI Tools for Recruiters: Candidate Outreach at Scale | Donbrico",
    description:
      "Save time on candidate outreach. Build a reply library for sourcing, follow-ups, offers, and rejections — then let AI personalize each message in seconds.",
  },
  "solutions.supportTeams.page": {
    title: "AI Customer Support Assistant for Shopify & eCommerce | Donbrico",
    description:
      "Cut reply time in half with AI-assisted ticket responses for Shopify, SaaS, and ecommerce support teams. Generate accurate, on-brand replies instantly.",
  },
  "solutions.ecommerceSupport.page": {
    title: "AI Customer Support for Shopify & Ecommerce Teams | Donbrico",
    description:
      "Automate order, refund & shipping replies with AI. Reduce ticket load by 50%. Free Chrome extension for Shopify ecommerce teams.",
  },
  "solutions.insurance.page": {
    title: "AI Form Automation for Insurance Workflows | Donbrico",
    description:
      "Donbrico Autofill AI fills claims, policy entry, and admin forms from a saved profile — reducing errors and saving hours each week. Try it free.",
  },
  "solutions.realEstate.page": {
    title: "AI Browser Tools for Real Estate Agents: Listings & Workflows | Donbrico",
    description:
      "Real estate agents save hours daily with AI that auto-fills listing forms, writes client follow-ups, and organizes browser workspaces per property — all in Chrome.",
  },
};

/** Map locale key prefix to HTML file path */
const HTML_BY_PREFIX = {
  "home.page": "index.html",
  "autofillAi.page": "autofill-ai/index.html",
  "medAutoFill.page": "med-autofill/index.html",
  "aiReplyAssistant.page": "ai-reply-assistant/index.html",
  "hostReply.page": "host-reply/index.html",
  "workDesk.page": "workdesk/index.html",
  "tradeDesk.page": "trade-desk/index.html",
  "extensions.page": "extensions/index.html",
  "about.page": "about/index.html",
  "support.page": "support/index.html",
  "privacyPolicy.page": "privacy-policy/index.html",
  "terms.page": "terms/index.html",
  "nullCarrier.page": "null-carrier/index.html",
  "solutions.page": "solutions/index.html",
  "solutions.automation.page": "solutions/automation/index.html",
  "solutions.communication.page": "solutions/communication/index.html",
  "solutions.workspace.page": "solutions/workspace/index.html",
  "solutions.browserWorkspace.page": "solutions/browser-workspace/index.html",
  "solutions.jobSeekers.page": "solutions/job-seekers/index.html",
  "solutions.recruiters.page": "solutions/recruiters/index.html",
  "solutions.supportTeams.page": "solutions/support-teams/index.html",
  "solutions.ecommerceSupport.page": "solutions/ecommerce-support/index.html",
  "solutions.insurance.page": "solutions/insurance/index.html",
  "solutions.realEstate.page": "solutions/real-estate/index.html",
};

function setNested(obj, keyPath, field, value) {
  const keys = keyPath.split(".");
  let cur = obj;
  for (const k of keys) {
    if (!cur[k] || typeof cur[k] !== "object") cur[k] = {};
    cur = cur[k];
  }
  cur[field] = value;
  if (field === "title") cur.ogTitle = value;
  if (field === "description") cur.ogDescription = value;
}

function prefixToDataI18n(prefix) {
  // home.page -> home.page.title
  return prefix;
}

function updateHtmlFallback(htmlPath, prefix, title, description) {
  const full = path.join(ROOT, htmlPath);
  if (!fs.existsSync(full)) {
    console.warn(`Missing: ${htmlPath}`);
    return;
  }
  let html = fs.readFileSync(full, "utf8");
  const base = prefix.replace(/\.page$/, "");
  const titleKey = `${base}.page.title`;
  const descKey = `${base}.page.description`;
  const ogTitleKey = `${base}.page.ogTitle`;
  const ogDescKey = `${base}.page.ogDescription`;

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  for (const [key, val] of [
    [titleKey, title],
    [ogTitleKey, title],
    [descKey, description],
    [ogDescKey, description],
  ]) {
    const re = new RegExp(
      `(<(?:title|meta)[^>]*data-i18n="${key.replace(/\./g, "\\.")}"[^>]*)(?:content="[^"]*"|>)[^<]*(?:</title>|/?>)`,
      "i",
    );
    html = html.replace(
      new RegExp(
        `(data-i18n="${key.replace(/\./g, "\\.")}"[^>]*content=")[^"]*(")`,
        "g",
      ),
      `$1${description.replace(/"/g, "&quot;")}$2`,
    );
  }

  html = html.replace(
    new RegExp(`(<title[^>]*data-i18n="${titleKey.replace(/\./g, "\\.")}"[^>]*>)[\\s\\S]*?(</title>)`, "i"),
    `$1\n      ${esc(title)}\n    $2`,
  );

  html = html.replace(
    new RegExp(
      `(data-i18n="${descKey.replace(/\./g, "\\.")}"\\s+content=")[^"]*(")`,
      "g",
    ),
    `$1${description.replace(/"/g, "&quot;")}$2`,
  );

  html = html.replace(
    new RegExp(
      `(data-i18n="${ogDescKey.replace(/\./g, "\\.")}"\\s+content=")[^"]*(")`,
      "g",
    ),
    `$1${description.replace(/"/g, "&quot;")}$2`,
  );

  html = html.replace(
    new RegExp(
      `(data-i18n="${ogTitleKey.replace(/\./g, "\\.")}"\\s+content=")[^"]*(")`,
      "g",
    ),
    `$1${title.replace(/"/g, "&quot;")}$2`,
  );

  fs.writeFileSync(full, html, "utf8");
  console.log(`Updated HTML: ${htmlPath}`);
}

const locale = JSON.parse(fs.readFileSync(LOCALE_PATH, "utf8"));

for (const [prefix, { title, description }] of Object.entries(SEO_UPDATES)) {
  setNested(locale, prefix, "title", title);
  setNested(locale, prefix, "description", description);
  const htmlPath = HTML_BY_PREFIX[prefix];
  if (htmlPath) updateHtmlFallback(htmlPath, prefix, title, description);
}

// Remove flat duplicate root keys (ignored by i18n but cause drift)
const flatPrefixes = Object.keys(SEO_UPDATES).map((p) => p.replace(/\.page$/, ""));
for (const key of Object.keys(locale)) {
  if (typeof locale[key] !== "string") continue;
  for (const fp of flatPrefixes) {
    if (key.startsWith(`${fp}.page.`)) {
      delete locale[key];
    }
  }
}

fs.writeFileSync(LOCALE_PATH, JSON.stringify(locale, null, 2) + "\n", "utf8");
console.log("Updated locales/en.json");
