import { readFile, stat } from 'node:fs/promises';

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
requireText(index, 'https://deck97game.com/', 'index canonical/metadata');
requireText(index.toLowerCase(), 'coming to steam', 'index CTA');
requireText(notFound, 'Record unavailable', '404');
requireText(robots, 'https://deck97game.com/sitemap-index.xml', 'robots');

if (cname !== 'deck97game.com') failures.push(`CNAME: expected deck97game.com, got ${cname}`);
if (/localhost|127\.0\.0\.1/i.test(index)) failures.push('index: localhost reference found');
if (/kickstarter\.com/i.test(index)) failures.push('index: Kickstarter URL present without configuration');

const media = [
  'media/deck97-hero.png',
  'media/deck97-object.png',
  'media/deck97-field-01.png',
  'media/deck97-field-02.png',
  'media/deck97-field-03.png',
  'media/deck97-field-04.png',
  'media/deck97-field-05.png',
];
for (const path of media) {
  try {
    const info = await stat(new URL(path, root));
    if (info.size > 1_000_000) failures.push(`${path}: exceeds 1 MB (${info.size} bytes)`);
  } catch {
    failures.push(`${path}: missing from build`);
  }
}

if (failures.length) {
  console.error('DECK 97 production validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('DECK 97 production validation: GREEN');
console.log('Canonical: https://deck97game.com/');
console.log(`CNAME: ${cname}`);
console.log(`Media checked: ${media.length}`);
