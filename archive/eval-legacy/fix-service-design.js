/**
 * fix-service-design.js — Surgical fix for service-design 0% routing
 *
 * Root cause: improvement's HIGH-priority "ICE" keyword substring-matches
 * "servICE design", tying at HIGH priority. Improvement wins insertion-order tie-break.
 *
 * Fixes:
 * 1. Add service-design terms to improvement's negative_keywords
 * 2. Add more HIGH-priority keywords to service-design
 */

const fs = require("fs");
const path = require("path");

const INDEX_FILE = path.join(__dirname, "..", "index.json");

// Backup
const bak = INDEX_FILE + ".bak-" + Date.now();
fs.copyFileSync(INDEX_FILE, bak);
console.log("Backup:", bak);

const index = JSON.parse(fs.readFileSync(INDEX_FILE, "utf-8"));
const tk = index.auto_router.trigger_keywords;

// ── 1. Add negative_keywords to improvement ──────────────────
const impNeg = tk.improvement.negative_keywords;
const serviceTermsToNegate = [
  "service design",
  "service blueprint",
  "service architecture",
  "service ecosystem",
  "service prototyping",
  "service quality",
  "service metrics",
  "service encounter",
  "service innovation",
  "service system",
  "service-dominant",
  "service journey",
  "service delivery",
  "service operations",
  "service strategy",
  // Additional ICE-substring traps: words ending in "ice" that
  // commonly appear in service/customer experience prompts
  "customer experience",
  "retail experience",
  "omnichannel experience",
  "healthcare experience",
  "booking experience",
  "appointment experience",
  "practice design",
  "choice architecture",
];

let addedNeg = 0;
for (const term of serviceTermsToNegate) {
  if (!impNeg.includes(term)) {
    impNeg.push(term);
    addedNeg++;
  }
}
console.log(`Added ${addedNeg} negative_keywords to improvement`);

// ── 2. Add HIGH-priority keywords to service-design ──────────
const svHigh = tk["service-design"].keywords.high;
const newHighKeywords = {
  "service delivery": ["01", "02"],
  "service operations": ["01", "02"],
  "service strategy": ["01"],
  "customer service design": ["01", "03"],
  "service improvement": ["07"],
  "omnichannel service": ["04"],
  "service experience design": ["01", "03"],
  "service design thinking": ["01"],
  "service workflow": ["02", "05"],
  "service orchestration": ["05"],
};

let addedHigh = 0;
for (const [kw, ids] of Object.entries(newHighKeywords)) {
  if (!svHigh[kw]) {
    svHigh[kw] = ids;
    addedHigh++;
  }
}
console.log(`Added ${addedHigh} HIGH keywords to service-design`);

// ── 3. Add MEDIUM-priority keywords to service-design ────────
const svMed = tk["service-design"].keywords.medium;
const newMedKeywords = {
  "omnichannel experience": ["04", "06"],
  "multi channel service": ["04"],
  "customer experience design": ["03", "06"],
  "service interface": ["02", "06"],
  "service touchpoint": ["03"],
  "end to end service": ["01", "03"],
  "seamless experience": ["03", "05"],
  "service evaluation": ["07"],
  "service audit": ["07"],
  "service flow design": ["02", "06"],
};

let addedMed = 0;
for (const [kw, ids] of Object.entries(newMedKeywords)) {
  if (!svMed[kw]) {
    svMed[kw] = ids;
    addedMed++;
  }
}
console.log(`Added ${addedMed} MEDIUM keywords to service-design`);

// ── Write ───────────────────────────────────────────────────
fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
console.log(`\n✅ index.json updated. Total changes: ${addedNeg + addedHigh + addedMed}`);
console.log("   Run: node eval/eval-runner.js --save --compare to verify");
