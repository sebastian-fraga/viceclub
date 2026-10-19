/**
 * Launches a WebKit browser session using Playwright with a predefined device profile.
 * Useful for testing responsive layouts and debugging Safari-specific behavior.
 *
 * Usage:
 *   node scripts/webkit.mjs [url] [device]
 *
 * Examples:
 *   node scripts/webkit.mjs
 *   node scripts/webkit.mjs http://localhost:4321 "iPhone 14"
 *   node scripts/webkit.mjs http://localhost:4321 "iPad"
 *
 * Defaults:
 *   - URL: http://localhost:4321
 *   - Device: iPhone 14
 *
 * The browser opens in headed mode and pauses for interactive debugging.
 * Resume execution from the Playwright Inspector to close the browser.
 */

import { devices, webkit } from "playwright";

const [url = "http://localhost:4321", deviceName = "iPhone 14"] =
    process.argv.slice(2);

const device = devices[deviceName];

if (!device) {
    console.error(`Unknown device: "${deviceName}"`);
    process.exit(1);
}

const browser = await webkit.launch({ headless: false });
const context = await browser.newContext({ ...device });
const page = await context.newPage();

await page.goto(url);

await page.pause();

await browser.close();
