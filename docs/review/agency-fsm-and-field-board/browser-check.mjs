const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const out = process.env.EVIDENCE_DIR || '/tmp/nsoc-career-new-evidence';
const browser = await chromium.launch({ headless: true });
const report = { checks: [], errors: [], sources: {} };
const ok = (check) => report.checks.push(check);
const listen = (page) => {
  page.on('pageerror', (error) => report.errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') report.errors.push(message.text()); });
};
const fsmURL = process.env.FSM_URL || 'http://127.0.0.1:5374/showcase/agency-studio/state-diagram.html';
const boardURL = process.env.BOARD_URL || 'http://127.0.0.1:5375/showcase/agritech-precision-farming/canvas-whiteboard.html';
try {
  const context = await browser.newContext({ viewport: { width: 1360, height: 1080 }, acceptDownloads: true });
  const page = await context.newPage(); listen(page);
  await page.goto(fsmURL); await page.locator('#events button').first().waitFor();
  assert.equal(await page.locator('#current').textContent(), 'Brief');
  await page.getByRole('button', { name: 'Deliver', exact: true }).click();
  assert.equal(await page.locator('#current').textContent(), 'Brief');
  await page.getByRole('button', { name: 'Start design', exact: true }).focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#current').textContent(), 'Design');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Start design');
  await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  assert.equal(await page.locator('#current').textContent(), 'Review');
  await page.getByRole('button', { name: 'Deliver', exact: true }).click();
  assert.equal(await page.locator('#current').textContent(), 'Review');
  assert.match(await page.locator('#status').textContent(), /Guard blocked/);
  await page.getByLabel('Client approved delivery').check();
  await page.getByRole('button', { name: 'Deliver', exact: true }).click();
  assert.equal(await page.locator('#current').textContent(), 'Delivered');
  await page.locator('#from').fill('Delivered'); await page.locator('#event').fill('Stay'); await page.locator('#to').fill('Delivered');
  await page.getByRole('button', { name: 'Add transition', exact: true }).click();
  await page.getByRole('button', { name: 'Stay', exact: true }).click();
  assert.equal(await page.locator('#current').textContent(), 'Delivered');
  await page.getByRole('button', { name: 'Add transition', exact: true }).click();
  assert.match(await page.locator('#status').textContent(), /unique event/);
  assert.equal(await page.locator('#transition-list li').count(), 6);
  ok('FSM native events, guard reject/approve, keyboard dispatch/focus, custom self-loop and duplicate rejection');
  const exportPromise = page.waitForEvent('download'); await page.getByRole('button', { name: 'Download Mermaid' }).click();
  const download = await exportPromise; await download.saveAs(`${out}/agency-workflow.mmd`);
  const mermaid = await readFile(`${out}/agency-workflow.mmd`, 'utf8');
  assert.equal(mermaid, await page.locator('#mermaid').textContent());
  assert.match(mermaid, /s3 --> s3 : Stay/); assert.match(mermaid, /s3 --> s0 : New brief/);
  await page.screenshot({ path: `${out}/fsm-desktop.png`, fullPage: true });
  await page.getByRole('button', { name: 'Reset workflow' }).click();
  assert.equal(await page.locator('#current').textContent(), 'Brief'); assert.equal(await page.locator('#history li').count(), 0);
  await page.reload(); assert.equal(await page.locator('#transition-list li').count(), 5);
  ok('FSM real Mermaid download exactly matches visible definition; cycle/self-loop, reset and fresh reload');

  await page.goto(boardURL); await page.locator('#board').waitFor();
  await page.waitForTimeout(100);
  const canvas = page.locator('#board');
  const bounds = await canvas.boundingBox();
  const p = (x, y) => ({ x: bounds.x + bounds.width * x / 1000, y: bounds.y + bounds.height * y / 650 });
  const drag = async (x1, y1, x2, y2) => {
    const a = p(x1, y1), b = p(x2, y2);
    await page.mouse.move(a.x, a.y); await page.mouse.down(); await page.mouse.move(b.x, b.y, { steps: 10 }); await page.mouse.up();
  };
  await drag(100, 100, 320, 190);
  await page.getByRole('button', { name: 'Line', exact: true }).click();
  await page.getByRole('button', { name: 'Water blue', exact: true }).click();
  await drag(100, 250, 650, 250);
  await page.getByRole('button', { name: 'Rectangle', exact: true }).click();
  await page.getByRole('button', { name: 'Soil red', exact: true }).click();
  await page.locator('#width').focus(); await page.keyboard.press('End');
  assert.equal(await page.locator('#width').inputValue(), '24');
  await drag(420, 350, 780, 500);
  assert.match(await page.locator('#stroke-count').textContent(), /^3 /);
  await page.getByRole('button', { name: 'Undo', exact: true }).click(); assert.match(await page.locator('#stroke-count').textContent(), /^2 /);
  await page.getByRole('button', { name: 'Redo', exact: true }).click(); assert.match(await page.locator('#stroke-count').textContent(), /^3 /);
  await page.getByRole('button', { name: 'Erase stroke', exact: true }).click();
  const hit = p(250, 250); await page.mouse.click(hit.x, hit.y); assert.match(await page.locator('#stroke-count').textContent(), /^2 /);
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  ok('Board real mouse pen/line/rectangle, color/width controls, segment-interior erase and undo/redo');
  // Navigate to canvas via native Tab, then draw with actual key events.
  await page.getByRole('button', { name: 'Line', exact: true }).click();
  await page.getByRole('button', { name: 'Download SVG' }).focus(); await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'board');
  await page.keyboard.press('Space'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('Shift+ArrowDown'); await page.keyboard.press('Space');
  assert.match(await page.locator('#stroke-count').textContent(), /^4 /);
  await page.keyboard.press('Space'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('Escape');
  assert.match(await page.locator('#stroke-count').textContent(), /^4 /);
  const svgPromise = page.waitForEvent('download'); await page.getByRole('button', { name: 'Download SVG' }).click();
  const svgDownload = await svgPromise; await svgDownload.saveAs(`${out}/field-planning-sketch.svg`);
  const vector = await readFile(`${out}/field-planning-sketch.svg`, 'utf8');
  assert.equal((vector.match(/<path/g) || []).length, 4); assert.match(vector, /stroke-width="24"/);
  const decoded = await page.evaluate(async (svg) => {
    const parsed = new DOMParser().parseFromString(svg, 'image/svg+xml');
    if (parsed.querySelector('parsererror')) throw Error('Invalid SVG');
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const image = new Image(); image.src = url; await image.decode();
    const target = document.createElement('canvas'); target.width = 1000; target.height = 650;
    const ctx = target.getContext('2d'); ctx.drawImage(image, 0, 0); URL.revokeObjectURL(url);
    const pixels = ctx.getImageData(0, 0, 1000, 650).data;
    let colored = 0, blue = 0, red = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] < 220 || pixels[i + 1] < 220 || pixels[i + 2] < 220) colored++;
      if (pixels[i + 2] > pixels[i] * 1.5 && pixels[i] < 130) blue++;
      if (pixels[i] > pixels[i + 1] * 1.5 && pixels[i] > pixels[i + 2] * 1.5) red++;
    }
    return { colored, blue, red, width: image.naturalWidth, height: image.naturalHeight };
  }, vector);
  assert.equal(decoded.width, 1000); assert.equal(decoded.height, 650);
  assert.ok(decoded.colored > 10000 && decoded.blue > 1000 && decoded.red > 10000);
  report.svgDecoded = decoded;
  await page.screenshot({ path: `${out}/whiteboard-desktop.png`, fullPage: true });
  await page.setViewportSize({ width: 900, height: 1000 });
  const againPromise = page.waitForEvent('download'); await page.getByRole('button', { name: 'Download SVG' }).click();
  const again = await againPromise; assert.equal(await readFile(await again.path(), 'utf8'), vector);
  await page.getByRole('button', { name: 'Clear board' }).click(); assert.match(await page.locator('#stroke-count').textContent(), /^0 /);
  await page.getByRole('button', { name: 'Undo', exact: true }).click(); assert.match(await page.locator('#stroke-count').textContent(), /^4 /);
  await page.reload(); assert.match(await page.locator('#stroke-count').textContent(), /^0 /);
  ok('Board native keyboard draw/cancel, decoded real SVG pixels/colors, resize export identity, clear undo and reload');

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, acceptDownloads: true });
  const small = await mobile.newPage(); listen(small);
  await small.goto(boardURL); const sheet = small.locator('#board'); await sheet.scrollIntoViewIfNeeded();
  const b = await sheet.boundingBox(); const cdp = await mobile.newCDPSession(small);
  const touch = async (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: x === undefined ? [] : [{ x, y, id: 1 }] });
  await touch('touchStart', b.x + b.width * .2, b.y + b.height * .3);
  await touch('touchMove', b.x + b.width * .7, b.y + b.height * .6); await touch('touchEnd');
  assert.match(await small.locator('#stroke-count').textContent(), /^1 /);
  await touch('touchStart', b.x + b.width * .3, b.y + b.height * .4);
  await touch('touchMove', b.x + b.width * .5, b.y + b.height * .5); await touch('touchCancel');
  assert.match(await small.locator('#stroke-count').textContent(), /^1 /);
  assert.ok(await small.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await small.screenshot({ path: `${out}/whiteboard-mobile.png`, fullPage: true });
  await small.goto(fsmURL); await small.getByRole('button', { name: 'Start design', exact: true }).tap();
  assert.equal(await small.locator('#current').textContent(), 'Design');
  assert.ok(await small.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await small.screenshot({ path: `${out}/fsm-mobile.png`, fullPage: true });
  ok('Mobile 390px actual CDP touch draw/cancel and FSM tap; neither page has horizontal overflow');
  for (const [key, url, local] of [
    ['fsm', fsmURL.replace('.html', '.js'), `${process.env.FSM_ROOT || '/tmp/nsoc-career2181'}/public/showcase/agency-studio/state-diagram.js`],
    ['board', boardURL.replace('.html', '.js'), `${process.env.BOARD_ROOT || '/tmp/nsoc-career2174'}/public/showcase/agritech-precision-farming/canvas-whiteboard.js`]
  ]) {
    const served = await (await page.request.get(url)).text();
    // Verify the production response matches the tested local source byte for byte.
    assert.equal(served, await readFile(local, 'utf8'));
    report.sources[key] = createHash('sha256').update(await readFile(local)).digest('hex');
  }
  assert.deepEqual(report.errors, []);
  report.passed = true;
} finally {
  await writeFile(`${out}/browser-report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
