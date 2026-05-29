const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function walkHtmlFiles(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.wrangler' || name === 'scripts' || name === 'scratch' || name === '.git') continue;
      walkHtmlFiles(full, files);
    } else if (name.endsWith('.html')) {
      // Skip activate.html since it has no navbar
      if (name !== 'activate.html') {
        files.push(full);
      }
    }
  }
  return files;
}

const newDropdown = `          <li class="dropdown">
            <a href="/tools/" data-i18n="nav.tools">Tools</a>
            <div class="dropdown-content">
              <a href="/file-whisperer/" data-i18n="nav.toolsFileWhisperer">FileWhisperer AI</a>
              <a href="/receipt-whisperer/" data-i18n="nav.toolsReceiptWhisperer">ReceiptWhisperer AI</a>
              <a href="/meeting-whisperer/" data-i18n="nav.toolsMeetingWhisperer">MeetingWhisperer AI</a>
            </div>
          </li>`;

function syncNavbar(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Check if Tools is already in nav-links to avoid duplicate insertions
  if (html.includes('data-i18n="nav.tools"') || html.includes('/file-whisperer/')) {
    console.log(`  [SKIP] ${path.relative(ROOT, filePath)}: Tools menu already exists.`);
    return false;
  }
  
  // Regex to find the Extensions dropdown </li>
  // It searches for `<li ... dropdown ...> ... href="/extensions/" ... </li>`
  const extensionsRegex = /(<li\s+class="dropdown"\s*>\s*<a\s+href="\/extensions\/"[\s\S]*?<\/li>)/i;
  
  if (!extensionsRegex.test(html)) {
    console.warn(`  [WARN] ${path.relative(ROOT, filePath)}: Could not find Extensions dropdown in navbar.`);
    return false;
  }
  
  html = html.replace(extensionsRegex, `$1\n${newDropdown}`);
  
  // Also add tools under "Extensions" in the footer column or expand footer
  // Let's see if we should add it in the footer.
  // In index.html footer:
  // <div class="footer-col">
  //   <h4 data-i18n="footer.extensions">Extensions</h4>
  //   ...
  // </div>
  // Wait, let's keep footer modifications simple. We can add a "Tools" section in the footer,
  // or add the new tools in the footer under the "Extensions" list, or add a new "Tools" column!
  // Adding them to the "Extensions" list in footer (since they are desktop versions of our suite) is very neat!
  // Let's search for `<a href="/workdesk/" data-i18n="nav.extensionsWorkdesk">WorkDesk</a>` in footer,
  // or `<a href="/workdesk/" ...>WorkDesk</a>` and insert the 3 new tools right after it!
  const workdeskFooterRegex = /(<a\s+href="\/workdesk\/"[^>]*>\s*(?:WorkDesk|Donbrico WorkDesk)\s*<\/a>)/i;
  const footerAdditions = `\n              <span class="dropdown-group-label" style="display:block; margin-top:10px; font-size:0.7rem; color:var(--muted);" data-i18n="nav.tools">Tools</span>\n              <a href="/file-whisperer/" data-i18n="nav.toolsFileWhisperer">FileWhisperer AI</a>\n              <a href="/receipt-whisperer/" data-i18n="nav.toolsReceiptWhisperer">ReceiptWhisperer AI</a>\n              <a href="/meeting-whisperer/" data-i18n="nav.toolsMeetingWhisperer">MeetingWhisperer AI</a>`;
  
  if (workdeskFooterRegex.test(html)) {
    html = html.replace(workdeskFooterRegex, `$1${footerAdditions}`);
  }
  
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  [UPDATED] ${path.relative(ROOT, filePath)}`);
  return true;
}

const files = walkHtmlFiles(ROOT);
console.log(`Found ${files.length} HTML files to inspect.`);
let count = 0;
for (const file of files) {
  if (syncNavbar(file)) {
    count++;
  }
}
console.log(`Successfully updated ${count} HTML files.`);
