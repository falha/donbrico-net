const fs = require('fs');
try {
    const content = fs.readFileSync('locales/en.json', 'utf8');
    JSON.parse(content);
    console.log('en.json is valid');
} catch (e) {
    console.error('en.json is invalid:', e.message);
}
