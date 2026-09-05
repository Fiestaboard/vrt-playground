// Captures every site/*.html page at desktop and mobile viewports into
// screenshots/. Pages are discovered dynamically, so adding or deleting an
// HTML file automatically adds/removes screenshots — which the visual
// regression action reports as added/removed.
import { chromium } from 'playwright';
import { mkdirSync, readdirSync, rmSync } from 'fs';
import { resolve } from 'path';

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];

const pages = readdirSync('site')
  .filter((f) => f.endsWith('.html'))
  .map((f) => f.replace(/\.html$/, ''))
  .sort();

rmSync('screenshots', { recursive: true, force: true });
mkdirSync('screenshots', { recursive: true });

const browser = await chromium.launch();
for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  for (const name of pages) {
    await page.goto('file://' + resolve('site', `${name}.html`));
    await page.screenshot({ path: `screenshots/${name}-${vp.name}.png`, fullPage: true });
    console.log(`captured ${name}-${vp.name}.png`);
  }
  await context.close();
}
await browser.close();
console.log(`done: ${pages.length * viewports.length} screenshots`);
