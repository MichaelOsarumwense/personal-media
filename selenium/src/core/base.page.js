import seleniumWebdriver from 'selenium-webdriver';
const { By, until } = seleniumWebdriver;

export class BasePage {
  constructor(driver) { this.driver = driver; }

  async open(path = '') { await this.driver.get(`${process.env.BASE_URL}${path}`); }

  async $(locator) {
    await this.driver.wait(until.elementLocated(locator), 15000);
    const el = await this.driver.findElement(locator);
    await this.driver.wait(until.elementIsVisible(el), 15000);
    return el;
  }

  byCss(sel) { return By.css(sel); }
  byTestId(id) { return By.css(`[data-testid="${id}"]`); }

  async scrollIntoView(el) {
    try {
      await this.driver.executeScript(
        'arguments[0].scrollIntoView({block: "center", inline: "center"});',
        el
      );
    } catch {}
  }

  async click(locator) {
    const el = await this.$(locator);
    await this.scrollIntoView(el);
    return this._robustClick(el);
  }

  async clickEl(el) {
    await this.driver.wait(until.elementIsVisible(el), 15000);
    await this.scrollIntoView(el);
    return this._robustClick(el);
  }

  async _robustClick(el) {
    // Try normal click, then move+click, then JS click as fallback
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await el.click();
        return;
      } catch (e) {
        if (attempt === 2) {
          // Final fallback
          try { await this.driver.executeScript('arguments[0].click();', el); return; } catch {}
          throw e;
        }
        // Try to bring it into view and move pointer over it
        await this.scrollIntoView(el);
        try {
          await this.driver.actions({ bridge: true }).move({ origin: el }).pause(50).perform();
        } catch {}
        await this.driver.sleep(100);
      }
    }
  }

  async type(locator, text) { const el = await this.$(locator); await this.scrollIntoView(el); await el.clear(); await el.sendKeys(text); }
  async textOf(locator) { return (await this.$(locator)).getText(); }
  async isPresent(locator) { return (await this.driver.findElements(locator)).length > 0; }
}
