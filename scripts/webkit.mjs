import { devices, webkit } from "playwright";

// Usage: node scripts/webkit.mjs [url] [device]
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
