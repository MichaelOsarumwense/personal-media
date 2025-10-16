import fs from 'fs';
import path from 'path';
import seleniumWebdriver from 'selenium-webdriver';
const { logging } = seleniumWebdriver;

export async function onFailCapture(driver, currentTest) {
  if (!currentTest || currentTest.state !== 'failed') return;
  const slug = currentTest.fullTitle().replace(/[^\w\-]+/g, '_').slice(0, 200);
  const dir = path.join('selenium', 'artifacts', 'runs', slug);
  fs.mkdirSync(dir, { recursive: true });
  try {
    const png = await driver.takeScreenshot();
    fs.writeFileSync(path.join(dir, 'screenshot.png'), png, 'base64');
  } catch {}
  try {
    const html = await driver.getPageSource();
    fs.writeFileSync(path.join(dir, 'page.html'), html);
  } catch {}
  try {
    const entries = await driver.manage().logs().get(logging.Type.BROWSER);
    fs.writeFileSync(path.join(dir, 'console.json'), JSON.stringify(entries, null, 2));
  } catch {}
}
