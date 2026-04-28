const fs = require('fs');
const c = fs.readFileSync('C:/dev/donbrico-net/locales/en.json', 'utf8');
try {
  JSON.parse(c);
  console.log('Valid');
} catch (e) {
  console.log('Error:', e.message);
  const lines = c.split('\n');
  let lineNo = 1, colNo = 0;
  for (let i = 0; i < e.position; i++) {
    if (c[i] === '\n') { lineNo++; colNo = 0; } else { colNo++; }
  }
  console.log('At line', lineNo, 'col', colNo);
  const start = Math.max(0, e.position - 100);
  console.log('Context:', c.substring(start, e.position + 100));
}
