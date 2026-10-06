#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");

const NAME = "what-da-shell";
const args = process.argv.slice(2);
const flags = new Set(args);

if (flags.has("--help") || flags.has("-h")) {
  console.log(`Usage: npx @kingsleylow0327/what-da-shell [options]

  (no option)   Install the skill to ~/.claude/skills/${NAME}
  --project     Use ./.claude/skills/${NAME} instead
  --uninstall   Remove the skill from the chosen place
  -h, --help    Show this help`);
  process.exit(0);
}

const known = new Set(["--project", "--uninstall", "--help", "-h"]);
const unknown = args.filter((a) => !known.has(a));
if (unknown.length) {
  console.error(`Unknown option: ${unknown.join(" ")}. Try --help.`);
  process.exit(1);
}

const skillsDir = flags.has("--project")
  ? path.join(process.cwd(), ".claude", "skills")
  : path.join(os.homedir(), ".claude", "skills");
const target = path.join(skillsDir, NAME);

if (flags.has("--uninstall")) {
  if (!fs.existsSync(target)) {
    console.log(`Nothing to remove at ${target}`);
    process.exit(0);
  }
  fs.rmSync(target, { recursive: true });
  console.log(`Removed ${target}`);
  process.exit(0);
}

const source = path.join(__dirname, "..", NAME, "SKILL.md");
fs.mkdirSync(target, { recursive: true });
fs.copyFileSync(source, path.join(target, "SKILL.md"));
console.log(`Installed to ${target}`);
console.log("Open a new Claude Code session, then type /what-da-shell");
