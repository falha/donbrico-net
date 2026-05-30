#!/usr/bin/env node
/**
 * Propagate unified navigation menu and footer from root index.html to all subpages.
 * Dynamically updates the active navigation state based on directory paths.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TEMPLATE_PATH = path.join(ROOT, "index.html");

// Walk directory recursively
function walkHtmlFiles(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === ".wrangler" || name === "scripts" || name === ".git") continue;
      walkHtmlFiles(full, files);
    } else if (name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

// Extract blocks from template (index.html)
function extractTemplates() {
  const html = fs.readFileSync(TEMPLATE_PATH, "utf8");

  // Extract <nav class="nav">...</nav>
  const navMatch = html.match(/<nav class="nav">([\s\S]*?)<\/nav>/i);
  if (!navMatch) throw new Error("Could not find <nav class='nav'> in index.html");
  const navTemplate = navMatch[0];

  // Extract <footer class="footer">...</footer>
  const footerMatch = html.match(/<footer class="footer">([\s\S]*?)<\/footer>/i);
  if (!footerMatch) throw new Error("Could not find <footer class='footer'> in index.html");
  const footerTemplate = footerMatch[0];

  return { navTemplate, footerTemplate };
}

// Adjust navigation links active state based on page path
function customizeNav(navHtml, relativePath) {
  let customized = navHtml;

  // Remove default active class from Home link
  customized = customized.replace('class="active"', '');

  // Determine path signature
  const normalizedPath = relativePath.replace(/\\/g, '/');

  let activeHref = null;

  if (normalizedPath.includes('/about/')) {
    activeHref = '/about/';
  } else if (normalizedPath.includes('/support/')) {
    activeHref = '/support/';
  } else if (normalizedPath.includes('/blog/')) {
    activeHref = '/blog/';
  } else if (normalizedPath.includes('/solutions/')) {
    activeHref = '/solutions/';
  } else if (
    normalizedPath.includes('/autofill-ai/') ||
    normalizedPath.includes('/med-autofill/') ||
    normalizedPath.includes('/propertyfill-ai/') ||
    normalizedPath.includes('/ai-reply-assistant/') ||
    normalizedPath.includes('/host-reply/') ||
    normalizedPath.includes('/trade-desk/') ||
    normalizedPath.includes('/seller-desk/') ||
    normalizedPath.includes('/recruit-reply/') ||
    normalizedPath.includes('/workdesk/') ||
    normalizedPath.includes('/file-whisperer/') ||
    normalizedPath.includes('/receipt-whisperer/') ||
    normalizedPath.includes('/meeting-whisperer/') ||
    normalizedPath.includes('/extensions/')
  ) {
    activeHref = '/extensions/'; // Products dropdown has href="/extensions/"
  }

  if (activeHref) {
    // Add active class to corresponding link
    const regex = new RegExp(`href="${activeHref}"`);
    customized = customized.replace(regex, `href="${activeHref}" class="active"`);
  } else {
    // Fallback: active on Home
    customized = customized.replace('href="/"', 'href="/" class="active"');
  }

  return customized;
}

function syncFile(filePath, templates) {
  const relativePath = path.relative(ROOT, filePath);
  if (relativePath === "index.html") return false; // Skip the source template

  let html = fs.readFileSync(filePath, "utf8");
  let changed = false;

  // 1. Replace <nav class="nav">...</nav>
  const navMatch = html.match(/<nav class="nav">[\s\S]*?<\/nav>/i);
  if (navMatch) {
    const freshNav = customizeNav(templates.navTemplate, relativePath);
    if (navMatch[0] !== freshNav) {
      html = html.replace(/<nav class="nav">[\s\S]*?<\/nav>/i, freshNav);
      changed = true;
    }
  } else {
    console.warn(`[WARN] No <nav class="nav"> block found in ${relativePath}`);
  }

  // 2. Replace <footer class="footer">...</footer>
  const footerMatch = html.match(/<footer class="footer">[\s\S]*?<\/footer>/i);
  if (footerMatch) {
    if (footerMatch[0] !== templates.footerTemplate) {
      html = html.replace(/<footer class="footer">[\s\S]*?<\/footer>/i, templates.footerTemplate);
      changed = true;
    }
  } else {
    console.warn(`[WARN] No <footer class="footer"> block found in ${relativePath}`);
  }

  if (changed) {
    fs.writeFileSync(filePath, html, "utf8");
    console.log(`[SYNCED] ${relativePath}`);
  }
  return changed;
}

try {
  console.log("Extracting nav and footer templates from index.html...");
  const templates = extractTemplates();

  console.log("Locating all HTML subpages...");
  const htmlFiles = walkHtmlFiles(ROOT);
  console.log(`Found ${htmlFiles.length} HTML files.`);

  let syncCount = 0;
  for (const file of htmlFiles) {
    if (syncFile(file, templates)) {
      syncCount++;
    }
  }

  console.log(`Sync completed successfully. ${syncCount} files were updated.`);
} catch (err) {
  console.error("Error during sync:", err.message);
  process.exit(1);
}
