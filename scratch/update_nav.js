const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (!dirPath.includes('.git') && !dirPath.includes('node_modules')) {
        walkDir(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.html')) {
        callback(path.join(dir, f));
      }
    }
  });
}

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // First, clean up the duplicate we just made in nav
  content = content.replace(/(<a href="\/seller-desk\/" data-i18n="nav\.extensionsSellerDesk">SellerDesk AI<\/a>\s*)+/g, '');
  
  let changed = false;

  // 1. Update Navigation Dropdown (only inside the nav block)
  // We can do this safely by doing a global replace for trade-desk, but appending seller-desk after it.
  // We just do a global replace for both nav and footer.
  // The string is exactly: <a href="/trade-desk/" data-i18n="nav.extensionsTradeDesk">TradeDesk AI</a>
  // Let's replace ALL instances of TradeDesk AI link with TradeDesk AI + SellerDesk AI
  const searchStr1 = '<a href="/trade-desk/" data-i18n="nav.extensionsTradeDesk">TradeDesk AI</a>';
  const replaceStr1 = '<a href="/trade-desk/" data-i18n="nav.extensionsTradeDesk">TradeDesk AI</a>\n              <a href="/seller-desk/" data-i18n="nav.extensionsSellerDesk">SellerDesk AI</a>';
  
  const searchStr2 = '<a href="/trade-desk/" class="active" data-i18n="nav.extensionsTradeDesk">TradeDesk AI</a>';
  const replaceStr2 = '<a href="/trade-desk/" class="active" data-i18n="nav.extensionsTradeDesk">TradeDesk AI</a>\n              <a href="/seller-desk/" data-i18n="nav.extensionsSellerDesk">SellerDesk AI</a>';

  if (content.includes(searchStr1) || content.includes(searchStr2)) {
    content = content.split(searchStr1).join(replaceStr1);
    content = content.split(searchStr2).join(replaceStr2);
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed: ' + filePath);
  }
}

walkDir(__dirname + '/..', processHtmlFile);
console.log('Finished fixing HTML files.');
