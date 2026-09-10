import { readFile, readdir, stat } from 'node:fs/promises';

const root = new URL('../dist/', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const failures = [];

const index = await read('index.html');
const notFound = await read('404.html');
const robots = await read('robots.txt');
const cname = (await read('CNAME')).trim();

const requireText = (haystack, needle, label) => {
  if (!haystack.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

requireText(index, 'A civilization is what it refuses to throw away.', 'index');
requireText(index, 'Inspect disputed objects. Uncover their histories. Decide what civilization keeps.', 'index');
requireText(index, 'Every shift begins with an object.', 'index');
requireText(index, 'The history is not given to you. You reconstruct it.', 'index');
requireText(index, 'The universe is enormous. Your desk is not.', 'index');
requireText(index, 'Three claims. One object. No uncontested history.', 'case teaser');
requireText(index, 'AUTH-011', 'case teaser');
requireText(index, 'https://deck97game.com/', 'index canonical/metadata');
requireText(index.toLowerCase(), 'coming to steam', 'index CTA');
requireText(notFound, 'Record unavailable', '404');
requireText(robots, 'https://deck97game.com/sitemap-index.xml', 'robots');

if (cname !== 'deck97game.com') failures.push(`CNAME: expected deck97game.com, got ${cname}`);
if (/localhost|127\.0\.0\.1/i.test(index)) failures.push('index: localhost reference found');
if (/kickstarter\.com/i.test(index)) failures.push('index: Kickstarter URL present without configuration');
if (/\/raw\/|staging-|case-seed-source/i.test(index)) failures.push('index: raw/staging media reference found');
if (/DECK 97 \(DEBUG\)/i.test(index)) failures.push('index: debug title exposed in HTML');

const astroDir = new URL('_astro/', root);
try {
  const files = await readdir(astroDir);
  const webp = files.filter((name) => name.endsWith('.webp'));
  if (webp.length < 7) failures.push(`optimized media: expected at least 7 WebP assets, found ${webp.length}`);
  for (const name of webp) {
    const info = await stat(new URL(name, astroDir));
    if (info.size > 650_000) failures.push(`optimized media: ${name} exceeds 650 KB (${info.size} bytes)`);
  }
} catch {
  failures.push('optimized media: _astro output missing');
}

if (failures.length) {
  console.error('DECK 97 production validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('DECK 97 production validation: GREEN');
console.log('Canonical: https://deck97game.com/');
console.log(`CNAME: ${cname}`);
console.log('Hero/object/case/gallery media optimized through astro:assets');
