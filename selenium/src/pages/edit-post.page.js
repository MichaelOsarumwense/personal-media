import seleniumWebdriver from 'selenium-webdriver';
import { BasePage } from '../core/base.page.js';
const { By } = seleniumWebdriver;

export class EditPostPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.textarea = By.css('form textarea');
    this.submit = By.xpath("//button[normalize-space(.)='Submit']");
  }
  async update(text) {
    await this.type(this.textarea, text);
    await this.click(this.submit);
    // Wait for navigation away from edit page
    try {
      await this.driver.wait(async () => !(await this.driver.getCurrentUrl()).includes('/edit-post'), 20000);
    } catch {}
    // Wait until the updated text is visible somewhere on the page (feed)
    await this.driver.wait(async () => {
      const els = await this.driver.findElements(By.xpath(`//*[contains(text(), ${JSON.stringify(text)})]`));
      return els.length > 0;
    }, 30000);
  }
}
