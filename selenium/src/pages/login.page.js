import seleniumWebdriver from 'selenium-webdriver';
import { BasePage } from '../core/base.page.js';
const { By } = seleniumWebdriver;

export class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.email = By.css('#email');
    this.password = By.css('#password');
    this.submit = By.css('#submitButton');
    this.signUp = By.css('#signUp');
    this.resetPassword = By.css('#resetPassword');
    this.logo = By.css('#logo');
  }
  async goto() { await this.open('/login'); }
  async login(email, password) { await this.type(this.email, email); await this.type(this.password, password); await this.click(this.submit); }
}
