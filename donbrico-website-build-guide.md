# DONBRICO.NET — Complete Website Build Guide
## From Zero to Live on Cloudflare, 100% Vibe Coded in VS Code
### Zero manual HTML/CSS writing — paste prompts in order, follow steps exactly

---

# READ THIS FIRST

This guide takes you from a fresh machine (VS Code only) to a live, professional website at **donbrico.net** hosted on **Cloudflare Pages** — with zero manual coding. You will paste prompts into VS Code's agent panel and accept the results.

**What you'll end up with:**
- `donbrico.net` — Home page with links to all projects
- `donbrico.net/autofill-ai` — Product page for Donbrico Autofill AI (Chrome extension)
- `donbrico.net/null-carrier` — Product page for Null Carrier (Steam game)
- `donbrico.net/privacy-policy` — Privacy Policy (required for Chrome Web Store)
- `donbrico.net/support` — Support page (required for Chrome Web Store, links to support@donbrico.net)

**Your only jobs:**
1. Follow each phase in order
2. Paste prompts into VS Code agent chat exactly as written
3. Click **Accept** when VS Code generates files
4. Follow the VERIFY steps to confirm it worked
5. Move to the next phase

**Golden rule:** Never skip a VERIFY step. If something doesn't work, use the TROUBLESHOOT prompt before moving on.

---

# PHASE 0 — INSTALL PREREQUISITES
## Time: ~20 minutes
## Tools you'll install: Git, Node.js, GitHub account, GitHub Copilot

---

### Step 0.1 — Install Git

1. Go to: **https://git-scm.com/downloads**
2. Download the installer for your OS (Windows/Mac/Linux)
3. Run the installer — accept all defaults
4. When done, open a **Terminal** in VS Code (`Ctrl+\`` ` or `` View → Terminal ``)
5. Type: `git --version`
6. You should see something like: `git version 2.44.0` ✅

---

### Step 0.2 — Install Node.js

Node.js is needed for Cloudflare's deployment tools.

1. Go to: **https://nodejs.org**
2. Download the **LTS** version (the big green button)
3. Run the installer — accept all defaults
4. In VS Code terminal, type: `node --version`
5. You should see: `v20.x.x` or higher ✅
6. Also verify: `npm --version` → shows `10.x.x` or higher ✅

---

### Step 0.3 — Create a GitHub account (skip if you have one)

1. Go to: **https://github.com/signup**
2. Create a free account
3. Verify your email address
4. Keep your username handy — you'll need it in Step 0.6

---

### Step 0.4 — Install GitHub Copilot extension in VS Code

GitHub Copilot provides the **agent mode** you'll use for vibe coding.

1. In VS Code, press `Ctrl+Shift+X` (Extensions panel)
2. Search: **GitHub Copilot**
3. Install **GitHub Copilot** (by GitHub) — click Install
4. Also install **GitHub Copilot Chat** (by GitHub) — click Install
5. VS Code will prompt you to sign in with GitHub → Sign in
6. Complete the browser authorization flow
7. You should see the Copilot icon in the bottom status bar ✅

> **Note:** GitHub Copilot requires a paid plan ($10/month) or is free for verified students.
> Alternative: If you don't want to pay, install **Continue** (free, open-source) and connect it to Claude or any free model. The prompts in this guide work with any AI agent.

---

### Step 0.5 — Configure Git with your identity

In the VS Code terminal, run these two commands (replace with your actual info):

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

### Step 0.6 — Create the GitHub repository

1. Go to: **https://github.com/new**
2. Fill in:
   - **Repository name:** `donbrico-net`
   - **Description:** `donbrico.net — Personal project website`
   - **Visibility:** Public ← required for free Cloudflare Pages
   - **Initialize with README:** ✅ Check this
3. Click **Create repository**
4. On the repo page, click the green **Code** button → copy the HTTPS URL
   - It will look like: `https://github.com/YOUR-USERNAME/donbrico-net.git`

---

### Step 0.7 — Clone the repo and open in VS Code

In the VS Code terminal:

```bash
cd ~
git clone https://github.com/YOUR-USERNAME/donbrico-net.git
cd donbrico-net
code .
```

VS Code will reopen with your project folder. You're ready to build.

---

### Step 0.8 — Open VS Code Agent Chat

1. Press `Ctrl+Shift+I` (or `Ctrl+Alt+I` on some setups) to open Copilot Chat
2. At the top of the chat panel, find the mode selector dropdown
3. Switch from **Ask** to **Agent** mode
4. You should see the agent panel ready for input ✅

> The agent can read, create, and edit files in your project automatically.

---

# PHASE 1 — PROJECT SETUP & RULES FILE
## Time: ~10 minutes
## Goal: Tell the agent everything it needs to know about this project

---

### PROMPT 1.1 — Create the project rules file

Paste this into the VS Code agent chat:

```
Create a file called `.github/copilot-instructions.md` in the project root with this exact content:

# Donbrico.net — Copilot Instructions

## Project
Personal website for donbrico.net. Static HTML/CSS/JS only — no frameworks, no build tools, no npm packages. Every page must work by simply opening the HTML file in a browser or being served from any static host.

## Site Structure
donbrico-net/
├── index.html              ← Home page (links to all projects)
├── autofill-ai/
│   └── index.html          ← Donbrico Autofill AI product page
├── null-carrier/
│   └── index.html          ← Null Carrier game page
├── privacy-policy/
│   └── index.html          ← Privacy Policy (required for Chrome Web Store)
├── support/
│   └── index.html          ← Support page (required for Chrome Web Store)
├── css/
│   └── style.css           ← Shared global styles
└── assets/
    └── (images, icons, etc.)

## Design Rules
- Dark theme: background #0a0a0f, primary text #e8e8f0
- Accent color: electric indigo #6366f1
- Secondary accent: cyan #06b6d4 (for Null Carrier / sci-fi sections)
- Font: Use Google Fonts. Import 'Space Grotesk' for headings, 'Inter' for body
- No JavaScript frameworks. Vanilla JS only for any interactions
- Mobile-first responsive design
- All navigation links must work with relative paths (no absolute paths)
- Every page must include a consistent nav bar with links to: Home, Autofill AI, Null Carrier, Privacy Policy, Support

## Code Style
- Clean semantic HTML5
- CSS custom properties (variables) for all colors and fonts
- No inline styles
- All external Google Fonts loaded via <link> in <head>
- Pages must have proper <title> and <meta description> tags
- Support email: support@donbrico.net

## DO NOT
- Use React, Vue, Angular, or any JS framework
- Use npm or node_modules
- Require a build step
- Use inline onclick handlers
- Use absolute URLs for internal links
```

After creating the file, confirm it was saved.
```

---

# PHASE 2 — BUILD THE SHARED CSS
## Time: ~10 minutes
## Goal: Create the design system that all pages will share

---

### PROMPT 2.1 — Generate the global stylesheet

```
Read the `.github/copilot-instructions.md` file first.

Create `css/style.css` with a complete, production-quality shared stylesheet for donbrico.net.

It must include:

1. CSS custom properties (variables) at :root for all colors, fonts, spacing
2. Google Fonts import for Space Grotesk (300,400,600,700) and Inter (400,500)
3. CSS reset / box-sizing
4. Body and base typography styles
5. A sticky navigation bar component (.nav) that:
   - Shows the donbrico logo/wordmark on the left
   - Shows nav links on the right: Home, Autofill AI, Null Carrier, Support
   - Has a subtle border-bottom with a glowing indigo tint
   - Collapses to a hamburger menu on mobile (< 768px)
   - Hamburger menu implemented in pure CSS (checkbox trick) — no JS
6. A `.hero` section class for page headers with a subtle gradient mesh background
7. A `.container` class (max-width: 1100px, centered, padded)
8. A `.btn` class for call-to-action buttons (filled indigo, hover animation)
9. A `.btn-outline` class for secondary buttons (outlined, ghost)
10. A `.card` class for project/feature cards with hover lift effect
11. A `.badge` class for small labels (e.g. "FREE", "COMING SOON", "STEAM")
12. Footer styles (.footer) with copyright and links
13. Utility classes: .text-muted, .text-accent, .section-title, .section-subtitle
14. Smooth scroll behavior on html element
15. Subtle grain/noise texture overlay on the body using a CSS pseudo-element

Make the design feel premium and technical — like a high-quality indie dev studio site.
Dark, minimal, with indigo accents. Not generic. Not bootstrap.
```

**VERIFY:** Open `css/style.css` — it should be 150+ lines with variables at the top.

---

# PHASE 3 — BUILD THE HOME PAGE
## Time: ~15 minutes
## Goal: Create index.html — the main landing page

---

### PROMPT 3.1 — Generate the home page

```
Read `.github/copilot-instructions.md` and `css/style.css` first.

Create `index.html` — the home page for donbrico.net.

Page sections (in order):

1. <head> with:
   - <title>Donbrico — Projects by a solo indie dev</title>
   - <meta name="description" content="donbrico.net — home of Donbrico Autofill AI and Null Carrier. Tools and games built by a solo developer.">
   - Link to css/style.css
   - Favicon placeholder (link to /assets/favicon.ico)
   - Open Graph tags (og:title, og:description, og:type=website)

2. Navigation bar using the .nav class from style.css
   - Logo: "donbrico" wordmark (text, styled)
   - Links: Home (active), Autofill AI → ./autofill-ai/, Null Carrier → ./null-carrier/, Support → ./support/

3. Hero section:
   - Eyebrow text: "INDEPENDENT DEVELOPER"
   - Headline: "Tools that work.<br>Games that think."
   - Subtext: "I build browser extensions and puzzle games. No VC funding. No team. Just code."
   - Two CTA buttons: "See Autofill AI →" (filled) and "See Null Carrier →" (outline)
   - Subtle animated grid lines in background (CSS only)

4. Projects section (title: "PROJECTS"):
   - Two project cards side by side (stack on mobile)
   
   Card 1 — Donbrico Autofill AI:
   - Badge: "CHROME EXTENSION"  
   - Badge: "FREE"
   - Title: "Donbrico Autofill AI"
   - Description: "AI-powered form filler for any website. Fills from your profile instantly. Uses Gemini Nano — your data never leaves your browser."
   - Tags: [Chrome Extension] [AI] [Privacy-first] [Free]
   - CTA: "Learn More →" linking to ./autofill-ai/

   Card 2 — Null Carrier:
   - Badge: "STEAM GAME"
   - Badge: "COMING SOON"
   - Title: "Null Carrier"
   - Description: "A signal-reconstruction puzzle game. You operate a deep-space listening array. Tune frequencies, decode transmissions, question what Command tells you."
   - Tags: [Puzzle] [Atmospheric] [Steam] [Indie]
   - CTA: "Learn More →" linking to ./null-carrier/

5. Footer:
   - Copyright: "© 2025 Donbrico. All rights reserved."
   - Links: Privacy Policy → ./privacy-policy/ | Support → ./support/
   - Text: "Built by a solo developer."

Use only the classes from style.css. No additional inline styles or new CSS.
```

**VERIFY:** Open `index.html` in your browser (right-click → Open with Live Server, or just double-click). Both project cards should be visible and the nav should render correctly.

---

# PHASE 4 — BUILD THE AUTOFILL AI PRODUCT PAGE
## Time: ~20 minutes

---

### PROMPT 4.1 — Generate the Autofill AI page

```
Read `.github/copilot-instructions.md` and `css/style.css` first.

Create `autofill-ai/index.html` — the product page for Donbrico Autofill AI Chrome extension.

Context about the product:
- Name: Donbrico Autofill AI
- Type: Google Chrome Extension (Manifest V3)
- Purpose: Detects forms on any website, fills standard fields from a saved profile, generates AI answers for open-ended fields
- AI: Uses Gemini Nano (built into Chrome, free, private, no API key) or user's own BYOK API key
- Core user flow: Save profile → visit form → click "⚡ Donbrico Autofill" button → fields fill instantly → AI handles open-ended fields
- Price: FREE (Gemini Nano + BYOK) | $14.99 one-time lifetime premium
- Free tier: Gemini Nano + BYOK, 1 profile, basic filling
- Premium: 3 profiles, cover letter generator, answer history, export
- No backend, no server, no ongoing cost

Page sections (in order):

1. <head>:
   - <title>Donbrico Autofill AI — AI-Powered Form Filler for Chrome</title>
   - Meta description: "Fill any web form instantly with AI. Works on job applications, contact forms, and more. Uses Gemini Nano — your data never leaves your browser. Free Chrome extension."
   - Link to ../css/style.css
   - Open Graph tags

2. Navigation (same nav, "Autofill AI" link active/highlighted)

3. Hero section:
   - Eyebrow: "CHROME EXTENSION"
   - Big headline: "Fill any form.<br>In one click."
   - Sub: "Donbrico Autofill AI detects forms on any website, fills your info instantly, and generates AI-powered answers for open-ended fields — entirely inside your browser."
   - CTA button: "Add to Chrome — Free" (disabled/greyed out with tooltip "Coming Soon" since not yet published)
   - Secondary CTA: "See how it works ↓" (smooth scroll anchor)
   - Small trust line: "🔒 Your data never leaves your browser · Powered by Gemini Nano · No account required"

4. "How It Works" section (id="how-it-works"):
   - 3-step horizontal layout:
   - Step 1: Save your profile — "Enter your name, email, LinkedIn, bio, skills. Stored locally. Synced across your Chrome."
   - Step 2: Visit any form — "The extension detects forms automatically on any page. A ⚡ button appears at the top of the form."
   - Step 3: One click, done — "Click the button. Standard fields fill instantly. AI generates answers for open-ended questions."

5. Features section:
   - Title: "Built different."
   - 6 feature cards in a 3×2 grid:
   1. "Works everywhere" — Any website with a form. Job applications, contact forms, signups.
   2. "100% private" — Gemini Nano runs inside Chrome. Your profile never hits any server.
   3. "AI for the hard parts" — Open-ended fields like cover letters? The AI writes them from your profile.
   4. "Bring your own key" — Use OpenAI, Anthropic, Groq, or OpenRouter if you prefer.
   5. "No account needed" — No sign-up. No email. Just install and use.
   6. "Editable before submit" — Review and tweak every AI-generated answer before the form goes out.

6. Pricing section:
   - Title: "Simple pricing."
   - Two cards side by side:
   
   FREE card (highlight):
   - "Free Forever"
   - Price: $0
   - Features list: ✅ Gemini Nano AI (built-in, private), ✅ Bring Your Own Key, ✅ 1 saved profile, ✅ Fill any form, ✅ Edit before submit
   - CTA: "Add to Chrome" (disabled, "Coming Soon")
   
   PREMIUM card:
   - "Lifetime License"
   - Price: $14.99 one-time (no subscription, ever)
   - Features list: Everything in Free, plus: ✅ 3 saved profiles, ✅ Cover letter generator, ✅ Answer history, ✅ Export answers, ✅ Priority support
   - CTA: "Get Lifetime Access" (disabled, "Coming Soon")

7. FAQ section (accordion, pure CSS no JS):
   - Q: Does it work on job sites like LinkedIn, Indeed, Greenhouse?
   - A: Yes. It detects forms on any website, including major job boards and ATS systems.
   - Q: Is my profile data private?
   - A: Completely. Your profile is stored in Chrome's local storage on your device. It is never sent to any server.
   - Q: What is Gemini Nano?
   - A: Gemini Nano is Google's AI model built directly into Chrome (version 127+). It runs on your device, which means AI answers with zero data leaving your browser.
   - Q: Do I need an API key?
   - A: No. The free version uses Gemini Nano which requires no key. If your device doesn't support it, you can optionally add your own key from OpenAI, Anthropic, Groq, or OpenRouter.
   - Q: When will it be available?
   - A: Currently in final development. Add it for free when it launches on the Chrome Web Store.

8. Footer (same as home page)

Use only classes from style.css. Relative path for CSS: ../css/style.css
All links that aren't ready yet should say "Coming Soon" and be visually disabled (cursor: not-allowed, reduced opacity).
```

**VERIFY:** Open `autofill-ai/index.html` in browser. The "How It Works" steps should be visible. Pricing cards should show. FAQ items should be expandable.

---

# PHASE 5 — BUILD THE NULL CARRIER GAME PAGE
## Time: ~20 minutes

---

### PROMPT 5.1 — Generate the Null Carrier page

```
Read `.github/copilot-instructions.md` and `css/style.css` first.

Create `null-carrier/index.html` — the product page for Null Carrier, a Steam puzzle game.

Context about the game:
- Name: Null Carrier
- Type: Puzzle / atmospheric single-player game for PC (Steam)
- Elevator pitch: A signal-reconstruction puzzle game. You operate a deep-space listening array. You tune frequencies, isolate signals from noise, reconstruct transmissions as pixel-matrix patterns, and classify them for Command. Over many shifts, you realize Command has been lying to you — and the signals were never from where you thought.
- Design pillars: Ambiguity is the mechanic. Systems not story. Radical minimalism. One screen, infinite depth. Two audiences (casual players feel unsettled; investigators uncover the full truth).
- Aesthetic: Industrial-utilitarian. Dark. Monochrome with green/cyan signal elements. Like an actual piece of deep-space scanning hardware.
- Status: Coming soon to Steam
- Genre tags: Puzzle, Atmospheric, Indie, Sci-fi, Mystery
- For the "coming soon" Steam link, use a placeholder "#" href

Page sections (in order):

1. <head>:
   - <title>Null Carrier — Deep-Space Signal Puzzle Game | Steam</title>
   - Meta description: "Operate a deep-space listening array. Tune frequencies, reconstruct signals, question your orders. A minimalist atmospheric puzzle game coming to Steam."
   - Link to ../css/style.css
   - Open Graph tags

2. Navigation (same nav, "Null Carrier" link active)

3. Hero section — make it feel cinematic and unsettling:
   - NO eyebrow label
   - Big moody headline (split across two lines): "Signal received.<br>Source unknown."
   - Below headline: A simulated "terminal readout" box showing:
     CHANNEL: 7734-ALPHA
     TIMESTAMP: 0312.88.44
     BAND FREQ: 847.3 MHz
     STATUS: ████ RECONSTRUCTING...
   - Subtext: "You work the deep-space listening array. Tune the frequencies. Reconstruct the transmissions. Classify for Command. Don't ask questions."
   - CTA button: "Wishlist on Steam →" (link to #, styled with Steam's green color #1b9e57 to make it distinct)
   - Secondary small text below: "PC · Coming Soon · Developed solo"
   - Ambient visual: a CSS-animated waveform/signal line across the hero (pure CSS animation)
   
4. "What is Null Carrier?" section:
   - Title: "One screen. Infinite doubt."
   - Body: A few paragraphs describing the game in the voice of someone who's played it:
     "Every shift begins the same way. A signal arrives. You tune your carrier frequency and noise gate until the waveform clears. You reconstruct the transmission — a pixel pattern that might mean something. You classify it and send it to Command.
     Command acknowledges. Another signal arrives.
     At shift 12, something is slightly off. At shift 23, you notice the coordinates don't add up. By shift 40, you've stopped trusting the readouts entirely."
   
5. Mechanics section — 4 feature items in a 2×2 grid:
   1. "Tune to Receive" — Adjust carrier frequency and noise gate sliders. Find the lock zone where clarity peaks. The signal is there — you just have to find it.
   2. "Reconstruct the Pattern" — A pixel matrix emerges from noise as your tuning improves. Each cell locks in when clarity is high enough.
   3. "Classify for Command" — Submit your reconstruction. Command responds. Cryptically. You won't know if you were right. That's the point.
   4. "Read Between the Shifts" — No tutorial. No objectives. Just metadata, coordinates, timestamps, and patterns. The story is only there if you look for it.

6. Design section:
   - Title: "Built to feel like a real instrument."
   - Subtext: "No 3D. No cutscenes. No dialogue. The entire game is played on one screen that looks and feels like actual signal analysis hardware. Every visual element earns its place."
   - Three design bullet points: "Radical minimalism · Industrial UI · Systems-driven narrative"

7. "Coming to Steam" section:
   - Large centered CTA with Steam button
   - "Wishlist Null Carrier on Steam to be notified at launch."
   - Button: "Wishlist on Steam →"

8. Footer (same footer)

Styling note for this page: Override the hero section background with a very dark near-black (#050508), 
add a subtle green/cyan tint (#00ff88 at 3% opacity) to the terminal readout box. 
Use inline <style> tag ONLY for page-specific overrides that don't belong in the shared stylesheet.
The terminal readout should use a monospace font (font-family: 'Courier New', monospace).
```

**VERIFY:** Open `null-carrier/index.html`. The hero should feel atmospheric and dark. The terminal box should render with monospace font.

---

# PHASE 6 — BUILD THE PRIVACY POLICY PAGE
## Time: ~10 minutes
## This page is REQUIRED by the Chrome Web Store to pass review

---

### PROMPT 6.1 — Generate the Privacy Policy page

```
Read `.github/copilot-instructions.md` first.

Create `privacy-policy/index.html` — the Privacy Policy page for donbrico.net.

This page covers the privacy policy for ALL products at donbrico.net, with specific sections for:
1. Donbrico Autofill AI (Chrome extension)
2. Null Carrier (Steam game — this website only, no data collection)
3. This website (donbrico.net itself)

<head>:
- <title>Privacy Policy — Donbrico</title>
- Meta description: "Privacy Policy for donbrico.net, Donbrico Autofill AI Chrome extension, and Null Carrier."
- Link to ../css/style.css

Navigation (same, no active item highlighted)

Page content — write a real, legally sensible privacy policy (not a template, actual useful content) with these sections:

1. Header: "Privacy Policy" with "Last updated: January 2025" subtitle

2. Overview:
Write 2-3 sentences: Donbrico is committed to privacy. The Autofill AI extension stores everything locally. This website does not use analytics or tracking cookies.

3. Section: Donbrico Autofill AI — Chrome Extension
Subsections:
- "What data we collect" — None. All profile data is stored locally in Chrome's storage on the user's device. No data is transmitted to any server owned or operated by Donbrico.
- "How profile data is stored" — Chrome's storage.local API, never chrome.storage.sync for sensitive data. Data remains on the device and is never uploaded.
- "Third-party AI providers (BYOK)" — If the user configures a BYOK (Bring Your Own Key) provider such as OpenAI, Anthropic, Groq, or OpenRouter, their form context and relevant profile data is sent to that third-party provider. Donbrico is not responsible for the privacy practices of those providers. Gemini Nano (the default AI) runs entirely on-device.
- "Permissions used" — storage (local profile), activeTab (detect forms on current tab), scripting (inject autofill button), host_permissions (work on any website the user visits).
- "Data deletion" — Uninstalling the extension removes all stored data.

4. Section: Null Carrier — Steam Game
- This section: The game itself does not collect personal data. Steam's own privacy policy governs any data collected through the Steam platform.

5. Section: This Website (donbrico.net)
- No analytics, no cookies, no tracking scripts.
- The website is a static HTML site hosted on Cloudflare Pages.
- No forms, no user accounts, no data collection of any kind.

6. Section: Contact
- For privacy questions, contact: support@donbrico.net

7. Section: Changes to This Policy
- This policy may be updated. Check this page for the latest version.

Footer (same footer)

Important: This page must be accessible at donbrico.net/privacy-policy — the folder/file structure already handles this.
```

**VERIFY:** Open `privacy-policy/index.html`. Read it — does it cover the extension, the game, and the website? Does it mention BYOK and Gemini Nano? ✅

---

# PHASE 7 — BUILD THE SUPPORT PAGE
## Time: ~10 minutes
## This page is REQUIRED by the Chrome Web Store to pass review

---

### PROMPT 7.1 — Generate the Support page

```
Read `.github/copilot-instructions.md` first.

Create `support/index.html` — the Support page for donbrico.net.

<head>:
- <title>Support — Donbrico</title>
- Meta description: "Get support for Donbrico Autofill AI and Null Carrier. Contact us at support@donbrico.net."
- Link to ../css/style.css

Navigation (same, no active)

Page content:

1. Header section:
   - Title: "Support"
   - Subtitle: "We're a solo operation. We read every message."

2. Contact section:
   - "Fastest way to reach us:"
   - Large email link: support@donbrico.net (styled as a big .btn-outline button)
   - Below: "We typically respond within 1–2 business days."

3. Section: Donbrico Autofill AI Support

   Subsection — Common Issues (styled as FAQ/accordion cards):
   Q: The extension button isn't appearing on a form
   A: Some websites use JavaScript to render forms dynamically. Try scrolling down to trigger the page to fully load, then look for the ⚡ button. If it still doesn't appear, email us with the URL of the site.
   
   Q: Gemini Nano says "Not supported on this device"
   A: Gemini Nano requires Chrome 127+ and sufficient device RAM (typically 8GB+). You can still use the extension by adding your own API key in Settings (BYOK). OpenAI, Anthropic, Groq, and OpenRouter are all supported.
   
   Q: My profile isn't saving
   A: Go to the extension's Options page (right-click extension icon → Options). Make sure you've clicked Save after entering your profile. If it still doesn't save, try the Troubleshoot button on the Options page.
   
   Q: The AI-generated answer doesn't sound like me
   A: The AI uses your profile to generate answers. Fill in the Bio and Experience fields with detail — the more context you give it, the better the output. You can always edit any answer before submitting.
   
   Q: How do I uninstall and remove my data?
   A: In Chrome, go to chrome://extensions, find Donbrico Autofill AI, click Remove. All your profile data will be deleted automatically.

   Q: How do I report a bug or request a feature?
   A: Email support@donbrico.net with "Bug:" or "Feature Request:" at the start of your subject line.

4. Section: Null Carrier Support
   - "For issues with Null Carrier on Steam, you can reach us through Steam's support system or directly at support@donbrico.net."
   - "Please include your Steam username and a description of the issue."

5. Section: Response time policy
   - "Donbrico is a solo development operation. Support is provided on a best-effort basis. We aim to respond within 1–2 business days. Critical extension bugs are prioritized."

Footer (same footer)
```

**VERIFY:** Open `support/index.html`. Check that support@donbrico.net appears as a clickable mailto link. ✅

---

# PHASE 8 — REVIEW & POLISH PASS
## Time: ~15 minutes
## Goal: Make everything consistent and production-ready

---

### PROMPT 8.1 — Consistency audit

```
Review all HTML files in the project: index.html, autofill-ai/index.html, null-carrier/index.html, privacy-policy/index.html, support/index.html.

Check and fix ALL of the following:
1. Every page has the correct relative path to css/style.css (root pages use ./css/style.css, subdirectory pages use ../css/style.css)
2. Every page has the navigation bar with correct relative links
3. The nav link for the current page is visually active/highlighted using an .active class
4. Every page has a consistent footer
5. All internal links use relative paths (no http:// for internal navigation)
6. The mailto link in the footer and support page points to support@donbrico.net
7. Every page has proper <meta charset="UTF-8"> and <meta name="viewport" content="width=device-width, initial-scale=1.0">
8. The "Add to Chrome" and "Wishlist on Steam" buttons on pages that aren't live yet are visually disabled (opacity: 0.5, cursor: not-allowed) and have title="Coming Soon" attributes

Fix any issues found. List what you changed.
```

---

### PROMPT 8.2 — Add a favicon and create a simple placeholder

```
Create `assets/favicon.svg` with a simple SVG favicon for donbrico.net.

Design: A dark square (#0a0a0f background) with the letter "D" in electric indigo (#6366f1) using a bold, clean font. Simple and recognizable at 16×16.

Then update ALL 5 HTML files to link to this favicon with:
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">

For root index.html, the path is: assets/favicon.svg
For subdirectory pages, the path is: ../assets/favicon.svg

Also add to each <head>:
<meta name="theme-color" content="#0a0a0f">
```

---

### PROMPT 8.3 — Mobile responsiveness check

```
Review css/style.css and all HTML files.

Ensure the site is fully responsive:
1. Navigation hamburger menu works on screens < 768px
2. Project cards stack vertically on mobile
3. Hero headline font size scales down on mobile (use clamp() or media queries)
4. Pricing cards stack vertically on mobile
5. The terminal readout box in null-carrier/index.html doesn't overflow on small screens (overflow-x: auto)
6. Buttons are at least 44px tall (touch target minimum)
7. Font sizes are readable on mobile (minimum 16px for body)

Add any missing responsive CSS to style.css. Do not add inline styles.
```

---

# PHASE 9 — SET UP GITHUB
## Time: ~10 minutes
## Goal: Push your website to GitHub so Cloudflare can access it

---

### Step 9.1 — Initialize and push to GitHub

In the VS Code terminal, run these commands one at a time:

```bash
git add .
git commit -m "Initial website build: home, autofill-ai, null-carrier, privacy-policy, support pages"
git push origin main
```

If `git push` fails because the branch is `master` instead of `main`, run:
```bash
git push origin master
```

**VERIFY:** Go to `https://github.com/YOUR-USERNAME/donbrico-net` in your browser. You should see all your files listed. ✅

---

### PROMPT 9.2 — Create a _redirects file for Cloudflare

```
Create a file called `_redirects` (no extension) in the project root with this content:

# Redirect /privacy-policy to /privacy-policy/ (trailing slash)
/privacy-policy  /privacy-policy/  301
/autofill-ai     /autofill-ai/     301
/null-carrier    /null-carrier/    301
/support         /support/         301

Also create a `_headers` file (no extension) in the project root:

/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

Then commit and push:
Run: git add . && git commit -m "Add Cloudflare _redirects and _headers" && git push
```

---

# PHASE 10 — DEPLOY TO CLOUDFLARE PAGES
## Time: ~15 minutes
## Goal: Connect your GitHub repo to Cloudflare and go live

---

### Step 10.1 — Create a Cloudflare account (skip if you have one)

1. Go to: **https://dash.cloudflare.com/sign-up**
2. Sign up with your email
3. Verify your email
4. You're in the Cloudflare dashboard ✅

---

### Step 10.2 — Create a new Cloudflare Pages project

1. In the Cloudflare dashboard, click **Workers & Pages** in the left sidebar
2. Click **Pages**
3. Click **Connect to Git**
4. Click **Connect GitHub**
5. Authorize Cloudflare to access your GitHub (grant access to `donbrico-net` repo only)
6. Select your `donbrico-net` repository
7. Click **Begin setup**

**Build settings:**
- **Project name:** `donbrico-net`
- **Production branch:** `main` (or `master` if that's what you used)
- **Build command:** *(leave blank — static HTML, no build needed)*
- **Build output directory:** *(leave blank — or enter `/` )*
- **Root directory:** *(leave blank)*

8. Click **Save and Deploy**

Cloudflare will deploy in ~60 seconds. You'll get a URL like:
`https://donbrico-net.pages.dev` ✅

---

### Step 10.3 — Test the pages.dev URL

Open these URLs in your browser and confirm they all work:
- `https://donbrico-net.pages.dev/`
- `https://donbrico-net.pages.dev/autofill-ai/`
- `https://donbrico-net.pages.dev/null-carrier/`
- `https://donbrico-net.pages.dev/privacy-policy/`
- `https://donbrico-net.pages.dev/support/`

All 5 should render correctly. ✅

---

# PHASE 11 — CONNECT YOUR CUSTOM DOMAIN (donbrico.net)
## Time: ~20 minutes (+ up to 24h for DNS propagation)
## Goal: Make donbrico.net point to your Cloudflare Pages site

---

### Step 11.1 — Add your domain to Cloudflare Pages

1. In Cloudflare dashboard → Workers & Pages → `donbrico-net`
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `donbrico.net`
5. Click **Continue**
6. Cloudflare will show you DNS records to add

---

### Step 11.2 — Add www redirect too

Repeat Step 11.1, but this time enter: `www.donbrico.net`

This ensures both `donbrico.net` and `www.donbrico.net` work.

---

### Step 11.3 — Configure DNS at your domain registrar

> This step depends on where you bought `donbrico.net`. Common registrars: Namecheap, GoDaddy, Google Domains, Cloudflare Registrar, Porkbun, etc.

**Option A — If you registered through Cloudflare Registrar:**
Your domain is already managed in Cloudflare DNS. The records will be added automatically. Skip to Step 11.5.

**Option B — If registered elsewhere (e.g., Namecheap, GoDaddy):**

You need to either:
1. Transfer DNS management to Cloudflare (recommended — free, faster), OR
2. Manually add CNAME records at your current registrar

**For Option B — Manual CNAME at your registrar:**
- Log into your domain registrar
- Find DNS settings / Zone Editor
- Add these records:

| Type  | Name | Value                        | TTL  |
|-------|------|------------------------------|------|
| CNAME | @    | donbrico-net.pages.dev       | Auto |
| CNAME | www  | donbrico-net.pages.dev       | Auto |

> **Note:** Some registrars don't allow CNAME on the root (@). If that's the case, use an ALIAS or ANAME record instead, or switch to Cloudflare DNS.

**For Option B — Transfer DNS to Cloudflare (recommended):**
1. In Cloudflare dashboard → Add a site → enter `donbrico.net`
2. Choose the Free plan
3. Cloudflare will scan your existing DNS records
4. Confirm records look right → Continue
5. Cloudflare gives you two nameservers (e.g., `aria.ns.cloudflare.com`)
6. Go to your registrar → update the nameservers to Cloudflare's
7. Wait 1–24 hours for propagation

---

### Step 11.4 — Enable HTTPS

Cloudflare automatically provisions SSL/TLS certificates for your domain.
1. In Cloudflare dashboard → your site → **SSL/TLS** → **Overview**
2. Make sure mode is set to **Full** or **Full (strict)**
3. In **Edge Certificates**, enable **Always Use HTTPS** ✅

---

### Step 11.5 — Verify your domain is live

After DNS propagates (usually within a few minutes if already on Cloudflare DNS, up to 24h otherwise):

Open in browser:
- `https://donbrico.net` ✅
- `https://donbrico.net/privacy-policy/` ✅ ← Send this URL to Chrome Web Store
- `https://donbrico.net/support/` ✅ ← Send this URL to Chrome Web Store
- `https://donbrico.net/autofill-ai/` ✅
- `https://donbrico.net/null-carrier/` ✅

---

# PHASE 12 — ONGOING WORKFLOW
## How to update the website after launch

---

### Every time you want to update the site:

1. Open VS Code in the `donbrico-net` folder
2. Open Copilot Agent chat (`Ctrl+Shift+I`)
3. Describe what you want to change — the agent edits the files
4. In VS Code terminal, run:

```bash
git add .
git commit -m "Brief description of what changed"
git push
```

5. Cloudflare auto-deploys in ~60 seconds. Your site is updated. ✅

That's it. No build step. No deploy command. Push = live.

---

### PROMPT 12.1 — When Autofill AI launches on Chrome Web Store

When the extension is approved, update the page with this prompt:

```
Update autofill-ai/index.html to:
1. Replace all "Coming Soon" button states with working links
2. The "Add to Chrome — Free" button should link to: [PASTE YOUR CHROME STORE URL]
3. Remove disabled styling (opacity: 0.5, cursor: not-allowed) from those buttons
4. Update the hero trust line to remove "Coming Soon" references
5. Commit the changes
```

---

### PROMPT 12.2 — When Null Carrier launches on Steam

```
Update null-carrier/index.html to:
1. Replace all # href values for Steam links with: [PASTE YOUR STEAM STORE URL]
2. Change the "COMING SOON" badge to "OUT NOW" on the null-carrier card in index.html
3. Update the button from "Wishlist on Steam" to "Buy on Steam"
4. Commit the changes
```

---

### PROMPT 12.3 — Add a third project later

```
I have a new project called [PROJECT NAME]. 

Read `.github/copilot-instructions.md` first.

1. Create a new directory [project-slug]/ with index.html for this project
2. The page should follow the same structure as autofill-ai/index.html
3. Add a new project card to index.html in the Projects section
4. Update the navigation on ALL pages to include a link to [project-slug]/
5. Project details: [describe your project here]
```

---

# QUICK REFERENCE — URLs FOR CHROME WEB STORE SUBMISSION

When submitting Donbrico Autofill AI to the Chrome Web Store, use:

| Field | URL |
|---|---|
| Privacy Policy URL | `https://donbrico.net/privacy-policy/` |
| Support URL | `https://donbrico.net/support/` |
| Homepage URL | `https://donbrico.net/autofill-ai/` |
| Support Email | `support@donbrico.net` |

---

# TROUBLESHOOT REFERENCE

### Git push fails with "authentication" error
```bash
# Set up a Personal Access Token on GitHub:
# GitHub → Settings → Developer Settings → Personal Access Tokens → Generate new token
# Grant "repo" scope
# Use it as your password when git asks for credentials
```

### Cloudflare deploy shows "Build failed"
```
My Cloudflare Pages build is failing with error: [paste error]
My project is pure static HTML with no build command.
Check if there's anything in my project files that could be causing this and fix it.
```

### Pages load but CSS isn't loading (styles missing)
```
CSS is not loading on [page URL]. 
Check all HTML files for incorrect relative paths to css/style.css.
Root pages should use ./css/style.css and subdirectory pages should use ../css/style.css.
Fix all path issues.
```

### Domain not resolving after DNS changes
Wait up to 24 hours. To check propagation: https://dnschecker.org → enter `donbrico.net` → check for CNAME pointing to `donbrico-net.pages.dev`

### Nav hamburger menu not working on mobile
```
The mobile hamburger navigation is not working on [page]. 
I want pure CSS implementation (checkbox trick, no JavaScript).
Fix the nav in style.css and ensure the HTML structure in all pages matches.
```

---

# SUMMARY CHECKLIST

## Phase Completion Tracker

- [ ] Phase 0: Prerequisites installed (Git, Node.js, GitHub account, Copilot)
- [ ] Phase 1: VS Code agent configured with rules file
- [ ] Phase 2: Shared CSS stylesheet built
- [ ] Phase 3: Home page (index.html) built
- [ ] Phase 4: Autofill AI product page built
- [ ] Phase 5: Null Carrier game page built
- [ ] Phase 6: Privacy Policy page built (Chrome Web Store requirement)
- [ ] Phase 7: Support page built (Chrome Web Store requirement)
- [ ] Phase 8: Polish pass — consistency, favicon, mobile
- [ ] Phase 9: Pushed to GitHub
- [ ] Phase 10: Deployed on Cloudflare Pages (live at pages.dev)
- [ ] Phase 11: Custom domain donbrico.net connected
- [ ] Phase 12: Ongoing workflow understood

**Estimated total time:** 2–3 hours for the first build
**Ongoing updates:** ~5 minutes per change (edit → git push → auto-deploy)

---

*Built for donbrico.net · Uses GitHub Copilot Agent (or any VS Code AI agent) · Hosted on Cloudflare Pages Free tier*
