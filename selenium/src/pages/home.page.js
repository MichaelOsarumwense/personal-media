import seleniumWebdriver from 'selenium-webdriver';
import { BasePage } from '../core/base.page.js';
const { By, until } = seleniumWebdriver;

export class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.container = By.css('#pageContainer');
    this.logout = By.css('#mLogout');
    this.userProfile = By.css('#userProfile');
    this.postText = By.css('#postText');
    this.submitPost = By.css('#submitPost');
  }

  async waitLoaded() { await this.$(this.container); }

  async createPost(text) {
    await this.type(this.postText, text);
    await this.click(this.submitPost);
    // wait for toast disappearance or list update; fallback to small wait then check presence
    await this.driver.wait(async () => {
      const els = await this.driver.findElements(By.xpath(`//*[contains(text(), ${JSON.stringify(text)})]`));
      return els.length > 0;
    }, 15000);
  }

  async openEditForPostContaining(text) {
    const cards = await this.driver.findElements(By.css('.w3-container.w3-card.w3-white.w3-round.w3-margin'));
    for (const card of cards) {
      const has = await card.getText().then(t => t.includes(text)).catch(() => false);
      if (has) {
        const btn = await card.findElement(By.css('#editButton'));
        await this.clickEl(btn);
        return true;
      }
    }
    return false;
  }

  async deletePostContaining(text) {
    const cards = await this.driver.findElements(By.css('.w3-container.w3-card.w3-white.w3-round.w3-margin'));
    for (const card of cards) {
      const has = await card.getText().then(t => t.includes(text)).catch(() => false);
      if (has) {
        const del = await card.findElement(By.css('#delete'));
        await this.clickEl(del);
        await this.driver.wait(until.elementLocated(By.css('#confirmDeleteRef')), 10000);
        await this.click(this.byCss('#confirmDeleteRef'));
        // wait until the text disappears
        await this.driver.wait(async () => {
          const els = await this.driver.findElements(By.xpath(`//*[contains(text(), ${JSON.stringify(text)})]`));
          return els.length === 0;
        }, 30000);
        return true;
      }
    }
    return false;
  }
}
