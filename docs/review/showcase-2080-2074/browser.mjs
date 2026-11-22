import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const [kind, origin, output] = process.argv.slice(2);
const base = new URL(origin);
assert.equal(base.hostname, "127.0.0.1");
const location = kind === "cost"
  ? "/showcase/podcast-audio-stream/cost-optimizer.html"
  : "/showcase/edtech-academy/voice-commander.html";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
const samples = [];

async function cost(page) {
  const amount = page.locator("#total");
  assert.equal(await amount.textContent(), "$132.05");
  const sliders = page.getByRole("slider");
  assert.equal(await sliders.count(), 3);
  for (const slider of await sliders.all()) {
    await slider.focus();
    await slider.press("Home");
  }
  assert.equal(await amount.textContent(), "$0.00");
  assert.equal(await page.locator("#compute-band").textContent(), "No usage");
  assert.equal(await page.locator("#chart").evaluate(e => getComputedStyle(e).backgroundImage), "none");
  for (const slider of await sliders.all()) await slider.press("End");
  assert.equal(await amount.textContent(), "$938.70");
  assert.equal(await page.locator("#compute-band").textContent(), "Tier 3 · $0.22 per unit");
  await page.getByRole("radio", { name: "Annual" }).check();
  assert.equal(await amount.textContent(), "$9,574.74");
  assert.equal(await page.locator("#subtotal").textContent(), "$12,516.00");
  assert.equal(await page.locator("#volume").textContent(), "−$1,251.60");
  assert.equal(await page.locator("#annual").textContent(), "−$1,689.66");
  assert.match(await page.locator("#chart").evaluate(e => getComputedStyle(e).backgroundImage), /^conic-gradient/);
  await page.locator("summary").click();
  assert.equal(await page.locator("details").evaluate(e => e.open), true);
  await page.locator("summary").click();
  return { keyboardRanges: true, zeroQuote: true, annualMax: "9574.74", matchingBreakdown: true };
}

async function prepareVoice(page, supported = true) {
  await page.addInitScript((active) => {
    window.speechSessions = [];
    window.voicedResponses = [];
    class RecognitionFixture {
      constructor() { window.speechSessions.push(this); }
      start() { this.onstart(); }
      abort() { this.aborted = true; this.onend(); }
    }
    window.SpeechRecognition = active ? RecognitionFixture : null;
    window.webkitSpeechRecognition = null;
    Object.defineProperty(window, "speechSynthesis", {
      value: { cancel() {}, speak(utterance) { window.voicedResponses.push(utterance.text); } },
    });
    window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  }, supported);
}

async function voice(page) {
  const mic = page.locator("#microphone");
  const field = page.getByRole("textbox", { name: "Type a command" });
  const status = page.getByRole("status");
  assert.equal(await page.evaluate(() => window.speechSessions.length), 0);
  await field.fill("go forward please");
  await field.press("Enter");
  assert.match(await status.textContent(), /not recognized/);
  assert.equal(await field.inputValue(), "go forward please");
  await field.fill("next lesson");
  await field.press("Enter");
  await page.getByRole("heading", { name: "Test an example" }).waitFor();
  assert.equal(await field.inputValue(), "");
  await page.getByRole("checkbox", { name: "Speak responses aloud" }).check();
  await mic.focus();
  await mic.press("Enter");
  assert.equal(await mic.getAttribute("aria-pressed"), "true");
  assert.match(await status.textContent(), /listening/i);
  assert.equal(await mic.evaluate(e => getComputedStyle(e, "::after").animationName), "none");
  await page.evaluate(() => window.speechSessions[0].onerror({ error: "not-allowed" }));
  assert.match(await status.textContent(), /permission was denied/i);
  assert.equal(await mic.getAttribute("aria-pressed"), "false");
  await mic.click();
  await page.evaluate(() => {
    const old = window.speechSessions[0];
    const active = window.speechSessions[1];
    const result = { resultIndex: 0, results: [{ isFinal: true, 0: { transcript: "next lesson" } }] };
    old.onresult(result);
    active.onresult(result);
    active.onresult(result);
  });
  await page.getByRole("heading", { name: "Capture the evidence" }).waitFor();
  assert.equal(await page.locator("#history > li").count(), 2);
  assert.equal(await mic.getAttribute("aria-pressed"), "false");
  assert.deepEqual(await page.evaluate(() => window.voicedResponses), ["Opened Capture the evidence."]);
  await field.fill("show shortcuts");
  await field.press("Enter");
  assert.equal(await page.locator("#shortcuts").evaluate(e => e.open), true);
  await page.getByRole("button", { name: "Read lesson", exact: true }).click();
  assert.match(await status.textContent(), /Record the input/);
  return { typedNavigation: true, permissionErrorAndRetry: true, staleResultsIgnored: true, synthesizedFixture: true };
}

try {
  for (const width of [1360, 760, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 950 }, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("requestfailed", request => errors.push(request.url()));
    page.on("response", response => { if (response.status() >= 400) errors.push(response.url()); });
    if (kind === "voice") await prepareVoice(page);
    await page.goto(new URL(location, base).href, { waitUntil: "networkidle" });
    const result = await (kind === "cost" ? cost(page) : voice(page));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.deepEqual(errors, []);
    if (width === 1360 || width === 390) {
      await page.screenshot({ path: join(output, "view-" + width + ".png"), fullPage: true, animations: "disabled" });
    }
    samples.push({ width, ...result, errors });
    await page.close();
  }
  if (kind === "voice") {
    const page = await browser.newPage();
    await prepareVoice(page, false);
    await page.goto(new URL(location, base).href, { waitUntil: "networkidle" });
    assert.equal(await page.getByRole("button", { name: "Start microphone" }).isDisabled(), true);
    await page.getByRole("textbox", { name: "Type a command" }).fill("next lesson");
    await page.getByRole("button", { name: "Run", exact: true }).click();
    await page.getByRole("heading", { name: "Test an example" }).waitFor();
    await page.close();
  }
  await writeFile(join(output, "report.json"), JSON.stringify({
    kind, samples, recognition: kind === "voice" ? "Deterministic fixture; no live microphone or audio output used." : undefined,
  }, null, 2) + "\n");
} finally {
  await browser.close();
}
