const fs = require('fs');
const text = fs.readFileSync('C:/dev/donbrico-net/locales/en.json', 'utf8');
try {
  const obj = JSON.parse(text);
  console.log('JSON valid. Top-level keys:', Object.keys(obj).join(', '));
  console.log('aiReplyAssistant present:', !!obj.aiReplyAssistant);
  if (obj.aiReplyAssistant) {
    console.log('  children:', Object.keys(obj.aiReplyAssistant).join(', '));
    console.log('  hero.title:', obj.aiReplyAssistant.hero?.title?.substring(0, 30));
  }
} catch (e) {
  console.error('Parse error:', e.message);
}
