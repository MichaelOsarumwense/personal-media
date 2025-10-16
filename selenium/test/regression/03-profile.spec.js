import { expect } from 'chai';
import { createDriver, teardownDriver } from '../../src/core/driver.js';
import { onFailCapture } from '../_helpers.js';
import { LoginPage } from '../../src/pages/login.page.js';
import { HomePage } from '../../src/pages/home.page.js';
import { UpdateUserPage } from '../../src/pages/update-user.page.js';

let driver; let login; let home; let update;

function uniq(prefix) { return `${prefix}-${Date.now()}-${Math.floor(Math.random()*1000)}`; }

describe('Profile Update', function () {
  this.timeout(60000);

  before(async function () {
    if (String(process.env.ALLOW_PROFILE_UPDATE || 'false') !== 'true') this.skip();
    driver = await createDriver();
    login = new LoginPage(driver);
    home = new HomePage(driver);
    update = new UpdateUserPage(driver);
    const email = process.env.TEST_USER_EMAIL; const password = process.env.TEST_USER_PASSWORD; const secret = process.env.TEST_USER_SECRET;
    if (!email || !password || !secret) this.skip();
    await login.goto();
    await login.login(email, password);
    await home.waitLoaded();
  });

  after(async () => { await teardownDriver(driver); });
  afterEach(async function() { await onFailCapture(driver, this.currentTest); });

  it('updates user fields', async () => {
    await driver.get(`${process.env.BASE_URL}/update-user`);
    const data = { address: uniq('Addr'), hobbies: uniq('Hob'), events: uniq('Evt'), secret: process.env.TEST_USER_SECRET };
    await update.updateUser(data);
    // Navigate home and verify one field presence in summary (best-effort)
    await driver.get(`${process.env.BASE_URL}/`);
    const found = await driver.findElements({ css: '#profileHobbies' });
    expect(found.length).to.be.greaterThan(0);
  });
});
