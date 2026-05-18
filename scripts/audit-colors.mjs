import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const themeFile = path.join(sourceRoot, "styles/theme.css");
const allowedExtensions = new Set([".css", ".ts", ".tsx"]);
const rawColorClassPattern =
  /\b(?:bg|text|border|ring|shadow|divide|placeholder|fill|stroke)-(?:white|black)(?:\/\d+)?\b/g;
const directHexPattern = /#[0-9a-fA-F]{3,8}\b/g;
const valueTokenPattern = /var\(--(?:palette|rgba|rgb)-[^)]+\)/g;
const legacyTokenPattern =
  /var\(--(?:primary-color|second-color|accent-color|line-color|danger-color|info-color|muted-color|background-color|card-color|badge-bg-color|badge-text-color|ink-color|success-color|warning-color|color-primary-green|color-primary-red|color-primary-blue|color-accent-gold|color-bg-ivory|color-ink|color-muted|color-line|color-card|color-card-strong|color-badge-bg|color-badge-text)\)/g;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!["assets"].includes(entry.name)) {
        walk(fullPath, files);
      }
      continue;
    }

    if (allowedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function toRelative(file) {
  return path.relative(root, file);
}

function lineNumberFor(text, index) {
  return text.slice(0, index).split("\n").length;
}

function collectMatches(file, text, pattern, message) {
  const matches = [];

  for (const match of text.matchAll(pattern)) {
    matches.push({
      file: toRelative(file),
      line: lineNumberFor(text, match.index ?? 0),
      match: match[0],
      message,
    });
  }

  return matches;
}

const files = walk(sourceRoot);
files.push(path.join(root, "vite.config.ts"));
const themeText = fs.readFileSync(themeFile, "utf8");
const definedVars = new Set(
  [...themeText.matchAll(/--[A-Za-z0-9_-]+(?=\s*:)/g)].map((match) => match[0]),
);
const problems = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const isTheme = file === themeFile;

  for (const match of text.matchAll(/var\((--[A-Za-z0-9_-]+)\)/g)) {
    const variable = match[1];

    if (!definedVars.has(variable)) {
      problems.push({
        file: toRelative(file),
        line: lineNumberFor(text, match.index ?? 0),
        match: variable,
        message: "undefined CSS variable",
      });
    }
  }

  if (isTheme) {
    continue;
  }

  const directHexMatches = collectMatches(
    file,
    text,
    directHexPattern,
    "direct hex color outside theme.css",
  ).filter((problem) => {
    if (toRelative(file) !== "vite.config.ts") {
      return true;
    }

    const line = text.split("\n")[problem.line - 1] ?? "";
    return !/PWA_(?:THEME|BACKGROUND)_COLOR/.test(line);
  });

  problems.push(
    ...directHexMatches,
    ...collectMatches(file, text, valueTokenPattern, "value-based color token outside theme.css"),
    ...collectMatches(file, text, legacyTokenPattern, "legacy color token outside theme.css"),
    ...collectMatches(file, text, rawColorClassPattern, "raw white/black Tailwind color"),
  );
}

if (problems.length > 0) {
  console.error("Color audit failed:");
  for (const problem of problems) {
    console.error(
      `- ${problem.file}:${problem.line} ${problem.message}: ${problem.match}`,
    );
  }
  process.exit(1);
}

console.log("Color audit passed.");
