import { expect } from 'chai';
import { createDriver, teardownDriver } from '../../src/core/driver.js';
import { onFailCapture } from '../_helpers.js';
import { LoginPage } from '../../src/pages/login.page.js';
import { HomePage } from '../../src/pages/home.page.js';

let driver; let login; let home;

describe('Logout @smoke', function () {
  this.timeout(45000);

  before(async function () {
    driver = await createDriver();
    login = new LoginPage(driver);
    home = new HomePage(driver);
    const email = process.env.TEST_USER_EMAIL; const password = process.env.TEST_USER_PASSWORD;
    if (!email || !password) this.skip();
    await login.goto();
    await login.login(email, password);
    await home.waitLoaded();
  });

  after(async () => { await teardownDriver(driver); });
  afterEach(async function() { await onFailCapture(driver, this.currentTest); });

  it('logs out to /login', async () => {
    await home.click(home.logout);
    await driver.wait(async () => (await driver.getCurrentUrl()).includes('/login'), 10000);
    const url = await driver.getCurrentUrl();
    expect(url).to.match(/\/login/);
  });
});
