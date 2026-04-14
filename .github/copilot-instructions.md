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
- All external Google Fonts loaded via &lt;link&gt; in &lt;head&gt;
- Pages must have proper &lt;title&gt; and &lt;meta description&gt; tags
- Support email: support@donbrico.net

## DO NOT
- Use React, Vue, Angular, or any JS framework
- Use npm or node_modules
- Require a build step
- Use inline onclick handlers
- Use absolute URLs for internal links