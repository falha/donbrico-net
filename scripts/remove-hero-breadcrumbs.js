#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const files = [
  "solutions/automation/index.html",
  "solutions/communication/index.html",
  "solutions/insurance/index.html",
  "solutions/support-teams/index.html",
  "solutions/workspace/index.html",
  "solutions/ecommerce-support/index.html",
];

const ROOT = path.join(__dirname, "..");
for (const rel of files) {
  const full = path.join(ROOT, rel);
  let html = fs.readFileSync(full, "utf8");
  const next = html.replace(/\s*<nav class="breadcrumb">[\s\S]*?<\/nav>\s*/g, "\n        ");
  if (next !== html) {
    fs.writeFileSync(full, next, "utf8");
    console.log(`Removed breadcrumb: ${rel}`);
  }
}
