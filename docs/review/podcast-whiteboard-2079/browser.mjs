import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const [base, target] = process.argv.slice(2);
const url = base + '/showcase/podcast-audio-stream/canvas-whiteboard.html';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
await mkdir(target, { recursive: true });
const errors = [];
const widths = [];
function observe(page) {
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => errors.push(request.url()));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
}
try {
  const page = await browser.newPage({ viewport: { width: 1360, height: 1000 }, acceptDownloads: true });
  observe(page);
  await page.goto(url, { waitUntil: 'networkidle' });
  const shapes = page.locator('#shapes > *');
  const button = name => page.getByRole('button', { name, exact: true });
  const tool = name => page.getByRole('radio', { name, exact: true });
  const point = async (x, y) => page.locator('#board').evaluate((node, xy) => {
    const point = new DOMPoint(...xy).matrixTransform(node.getScreenCTM());
    return [point.x, point.y];
  }, [x, y]);
  async function draw(points) {
    await page.locator('#board').scrollIntoViewIfNeeded();
    await page.mouse.move(...await point(...points[0]));
    await page.mouse.down();
    for (const next of points.slice(1)) await page.mouse.move(...await point(...next), { steps: 4 });
    await page.mouse.up();
  }

  assert.ok(await button('Undo').isDisabled());
  await draw([[80, 90], [160, 45], [250, 125], [340, 60]]);
  assert.equal(await shapes.count(), 1);
  assert.match(await shapes.first().getAttribute('d'), / Q .* L /);
  await tool('Rectangle').check();
  await page.locator('#color').fill('#68dab8');
  await page.locator('#width').focus();
  await page.keyboard.press('ArrowRight');
  await draw([[300, 190], [520, 300]]);
  assert.equal(await shapes.count(), 2);
  assert.equal(await shapes.nth(1).evaluate(node => node.localName), 'rect');
  assert.equal(await shapes.nth(1).getAttribute('stroke'), '#68dab8');
  assert.equal(await shapes.nth(1).getAttribute('stroke-width'), '6');
  await tool('Line').check();
  await page.locator('#board').focus();
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Space');
  assert.equal(await shapes.count(), 3);
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Escape');
  assert.equal(await shapes.count(), 3);
  assert.equal(await page.locator('#preview > *').count(), 0);

  await tool('Eraser').check();
  await draw([[300, 240], [300, 250]]);
  assert.equal(await shapes.count(), 2);
  assert.equal(await page.locator('#shapes rect').count(), 0);
  await button('Undo').click();
  assert.equal(await page.locator('#shapes rect').count(), 1);
  await button('Redo').click();
  assert.equal(await page.locator('#shapes rect').count(), 0);
  await button('Undo').click();
  await button('Clear board').click();
  assert.equal(await shapes.count(), 0);
  await button('Undo').click();
  assert.equal(await shapes.count(), 3);

  const downloading = page.waitForEvent('download');
  await button('Download SVG').click();
  const download = await downloading;
  assert.equal(download.suggestedFilename(), 'episode-whiteboard.svg');
  const source = await readFile(await download.path(), 'utf8');
  const data = await page.evaluate(xml => {
    const parsed = new DOMParser().parseFromString(xml, 'image/svg+xml');
    return {
      malformed: !!parsed.querySelector('parsererror'),
      shapes: Array.from(parsed.documentElement.children, n => n.localName),
      viewBox: parsed.documentElement.getAttribute('viewBox'),
    };
  }, source);
  assert.deepEqual(data, { malformed: false, shapes: ['path', 'rect', 'path'], viewBox: '0 0 960 540' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: target + '/desktop.png' });
  for (const width of [1360, 760, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    widths.push(width);
  }
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await shapes.count(), 0);

  const touch = await browser.newPage({ viewport: { width: 390, height: 850 }, isMobile: true, hasTouch: true });
  observe(touch);
  await touch.goto(url, { waitUntil: 'networkidle' });
  await touch.locator('#board').tap();
  assert.equal(await touch.locator('#shapes circle').count(), 1);
  await touch.screenshot({ path: target + '/mobile.png' });
  assert.deepEqual(errors, []);
  await writeFile(target + '/browser-report.json', JSON.stringify({
    passed: true, widths, errors,
    checks: ['Real pointer pen with smoothing', 'Rectangle width/color', 'Keyboard line and cancel', 'Object erasing', 'Undo/redo and clear recovery', 'Actual editable SVG download', 'Mobile touch', 'Reload reset'],
  }, null, 2) + '\n');
} finally {
  await browser.close();
}
