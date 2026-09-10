import { readFile, stat } from 'node:fs/promises';

const root = new URL('../dist/', import.meta.url);
const failures = [];

const read = (path) => readFile(new URL(path, root), 'utf8');
const requireText = (haystack, needle, label) => {
  if (!haystack.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

const index = await read('index.html');
const loader = await read('hero-video.js');
const styles = await read('hero-video.css');

requireText(index, '/hero-video.css', 'index');
requireText(index, '/hero-video.js', 'index');
requireText(loader, '/media/deck97-hero-loop.mp4', 'hero loader');
requireText(loader, '/media/deck97-hero-video-poster.webp', 'hero loader');
requireText(loader, 'prefers-reduced-motion: reduce', 'hero loader');
requireText(styles, '.hero-video.is-playing', 'hero styles');
requireText(styles, 'prefers-reduced-motion: reduce', 'hero styles');

const video = await stat(new URL('media/deck97-hero-loop.mp4', root)).catch(() => null);
const poster = await stat(new URL('media/deck97-hero-video-poster.webp', root)).catch(() => null);

if (!video) failures.push('hero video: missing dist/media/deck97-hero-loop.mp4');
else {
  if (video.size < 10_000) failures.push(`hero video: suspiciously small (${video.size} bytes)`);
  if (video.size > 500_000) failures.push(`hero video: exceeds 500 KB budget (${video.size} bytes)`);
}

if (!poster) failures.push('hero poster: missing dist/media/deck97-hero-video-poster.webp');
else if (poster.size > 150_000) failures.push(`hero poster: exceeds 150 KB budget (${poster.size} bytes)`);

if (failures.length) {
  console.error('DECK 97 hero video validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('DECK 97 hero video validation: GREEN');
console.log(`Hero video: ${video.size} bytes`);
console.log(`Hero poster: ${poster.size} bytes`);
console.log('Reduced-motion path: static hero only');
