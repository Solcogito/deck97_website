import { readFile, readdir, stat } from 'node:fs/promises';

const root = new URL('../dist/', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const failures = [];

const index = await read('index.html');
const french = await read('fr/index.html');
const notFound = await read('404.html');
const robots = await read('robots.txt');
const cname = (await read('CNAME')).trim();

const requireText = (haystack, needle, label) => {
  if (!haystack.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

requireText(index, 'A civilization is what it refuses to throw away.', 'index');
requireText(index, 'Inspect disputed objects. Reconstruct their histories. Decide what civilization keeps.', 'index');
requireText(index, 'Every shift begins with an object.', 'index');
requireText(index, 'The history is not given to you. You reconstruct it.', 'index');
requireText(index, 'The universe is enormous. Your desk is not.', 'index');
requireText(index, 'Built in Quebec. Meant to remain human.', 'index project');
requireText(index, 'Three claims. One object. No uncontested history.', 'case teaser');
requireText(index, 'AUTH-011', 'case teaser');
requireText(index, 'https://deck97game.com/', 'index canonical/metadata');
requireText(index.toLowerCase(), 'coming to steam', 'index CTA');
requireText(index, 'href="/fr/"', 'index language switch');

requireText(french, 'Une civilisation, c’est ce qu’elle refuse de jeter.', 'fr index');
requireText(french, 'Inspectez des objets disputés. Reconstituez leur histoire. Décidez de ce que la civilisation conserve.', 'fr index');
requireText(french, 'Créé au Québec. Pensé pour rester humain.', 'fr project');
requireText(french, 'href="/"', 'fr language switch');
requireText(french, 'lang="fr"', 'fr document language');

requireText(notFound, 'Record unavailable', '404');
requireText(robots, 'https://deck97game.com/sitemap-index.xml', 'robots');

if (cname !== 'deck97game.com') failures.push(`CNAME: expected deck97game.com, got ${cname}`);
if (/localhost|127\.0\.0\.1/i.test(index + french)) failures.push('site: localhost reference found');
if (/kickstarter\.com/i.test(index + french)) failures.push('site: Kickstarter URL present without configuration');
if (/\/raw\/|staging-|case-seed-source/i.test(index + french)) failures.push('site: raw/staging media reference found');
if (/DECK 97 \(DEBUG\)/i.test(index + french)) failures.push('site: debug title exposed in HTML');
if (/hero-video\.js|hero-video\.css/i.test(index + french)) failures.push('site: retired hero video loader still mounted');

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
console.log('Locales: EN / FR');
console.log('Canonical: https://deck97game.com/');
console.log(`CNAME: ${cname}`);
console.log('Current gameplay hero/object/case/gallery media optimized through astro:assets');
