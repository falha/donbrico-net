#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (["node_modules", ".wrangler", "scripts"].includes(name)) continue;
      walk(full, files);
    } else if (name.endsWith(".html")) files.push(full);
  }
  return files;
}

const root = path.join(__dirname, "..");
let empty = 0;
for (const file of walk(root)) {
  const html = fs.readFileSync(file, "utf8");
  const re =
    /<(\w+)([^>]*\sdata-i18n="([^"]+)"[^>]*)(?:\/>|>([\s\S]*?)<\/\1>)/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1].toLowerCase();
    if (tag === "meta") continue;
    const inner = (m[4] || "").trim();
    if (!inner) {
      console.log(`${path.relative(root, file)}: empty [${m[3]}]`);
      empty++;
    }
  }
}
if (empty) {
  process.exitCode = 1;
  console.error(`\n${empty} empty data-i18n fallbacks found.`);
} else {
  console.log("All data-i18n elements have fallback text.");
}
