import seleniumWebdriver from 'selenium-webdriver';
import chromeNS from 'selenium-webdriver/chrome.js';
import firefoxNS from 'selenium-webdriver/firefox.js';
const { Builder } = seleniumWebdriver;
const chrome = chromeNS;
const firefox = firefoxNS;

export async function createDriver(opts = {}) {
  const browser = opts.browser || process.env.BROWSER || 'chrome';
  const headless = opts.headless !== undefined ? opts.headless : (process.env.HEADLESS !== 'false');
  const gridUrl = opts.gridUrl || process.env.SELENIUM_GRID_URL;

  const builder = gridUrl
    ? new Builder().usingServer(gridUrl).forBrowser(browser)
    : new Builder().forBrowser(browser);

  if (browser === 'chrome') {
    const options = new chrome.Options();
    if (headless) options.addArguments('--headless=new');
    options.addArguments('--window-size=1366,900','--disable-gpu','--no-sandbox','--disable-dev-shm-usage');
    options.set('goog:loggingPrefs', { browser: 'ALL' });
    builder.setChromeOptions(options);
  } else if (browser === 'firefox') {
    const options = new firefox.Options();
    if (headless) options.addArguments('-headless');
    builder.setFirefoxOptions(options);
  }

  return builder.build();
}

export async function teardownDriver(driver) {
  if (!driver) return; try { await driver.quit(); } catch {}
}
