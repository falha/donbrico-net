const fs = require('fs');
const c = fs.readFileSync('C:/dev/donbrico-net/locales/en.json', 'utf8');
const indices = [];
let idx = c.indexOf('Donbrico AI Reply Assistant Support');
while (idx !== -1) {
  indices.push(idx);
  idx = c.indexOf('Donbrico AI Reply Assistant Support', idx + 1);
}
console.log('Count:', indices.length);
indices.forEach((pos, i) => {
  const line = c.substring(0, pos).split(/\r?\n/).length;
  console.log(`Match ${i+1} at char ${pos}, line ~${line}`);
});
