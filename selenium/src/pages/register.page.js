import seleniumWebdriver from 'selenium-webdriver';
import { BasePage } from '../core/base.page.js';
const { By } = seleniumWebdriver;

export class RegisterPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.name = By.css('#name');
    this.email = By.css('#email');
    this.password = By.css('#password');
    this.secret = By.css('#secret');
    this.address = By.css('#address');
    this.dob = By.css('#dob');
    this.hobbies = By.css('#hobbies');
    this.events = By.css('#events');
    this.submit = By.css('#submitButton');
  }
  async goto() { await this.open('/register'); }
  async register(user) {
    await this.type(this.name, user.name);
    await this.type(this.email, user.email);
    await this.type(this.password, user.password);
    await this.type(this.secret, user.secret);
    await this.type(this.address, user.address || '');
    await this.type(this.dob, user.dob || '');
    await this.type(this.hobbies, user.hobbies || '');
    await this.type(this.events, user.events || '');
    await this.click(this.submit);
  }
}
