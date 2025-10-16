import { expect } from 'chai';
import { createDriver, teardownDriver } from '../../src/core/driver.js';
import { onFailCapture } from '../_helpers.js';
import { LoginPage } from '../../src/pages/login.page.js';
import { BasePage } from '../../src/core/base.page.js';

let driver; let login; let base;

describe('Authentication @smoke', function () {
  this.timeout(45000);

  before(async () => { driver = await createDriver(); login = new LoginPage(driver); base = new BasePage(driver); });
  after(async () => { await teardownDriver(driver); });
  afterEach(async function() { await onFailCapture(driver, this.currentTest); });

  it('logs in with valid credentials', async function () {
    const email = process.env.TEST_USER_EMAIL; const password = process.env.TEST_USER_PASSWORD;
    if (!email || !password) { this.skip(); }
    await login.goto();
    await login.login(email, password);
    // Expect to be on home and page container visible
    await driver.wait(async () => (await driver.getCurrentUrl()).includes('/login') === false, 15000);
    const present = await base.isPresent(base.byCss('#pageContainer'));
    expect(present).to.equal(true);
  });
});
