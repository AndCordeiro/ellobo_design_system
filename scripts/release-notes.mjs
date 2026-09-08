#!/usr/bin/env node
/**
 * Prints the CHANGELOG.md section of the version declared in package.json.
 * Used by the release workflow to fill the GitHub Release body.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { version } = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const changelog = readFileSync(resolve(root, 'CHANGELOG.md'), 'utf8');

const lines = changelog.split('\n');
const start = lines.findIndex((line) => line.trim() === `## ${version}`);

if (start === -1) {
  console.error(`[release-notes] No "## ${version}" section found in CHANGELOG.md`);
  process.exit(1);
}

let end = lines.length;
for (let index = start + 1; index < lines.length; index += 1) {
  if (/^## /.test(lines[index])) {
    end = index;
    break;
  }
}

process.stdout.write(
  lines
    .slice(start + 1, end)
    .join('\n')
    .trim() + '\n',
);
