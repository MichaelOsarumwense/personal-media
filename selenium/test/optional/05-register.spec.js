import { createDriver, teardownDriver } from '../../src/core/driver.js';
import { RegisterPage } from '../../src/pages/register.page.js';
import { onFailCapture } from '../_helpers.js';
import { expect } from 'chai';

function uniq(prefix) { return `${prefix}-${Date.now()}-${Math.floor(Math.random()*1000)}`; }

let driver; let register;

describe('Registration (optional, destructive)', function () {
  this.timeout(60000);

  before(async function () {
    if (String(process.env.ALLOW_REGISTRATION || 'false') !== 'true') this.skip();
    driver = await createDriver();
    register = new RegisterPage(driver);
  });

  after(async () => { await teardownDriver(driver); });
  afterEach(async function() { await onFailCapture(driver, this.currentTest); });

  it('registers a new user and redirects to login', async () => {
    await register.goto();
    const email = `${uniq('user')}@example.test`;
    await register.register({
      name: 'E2E User',
      email,
      password: 'Passw0rd!',
      secret: 'secret',
      address: 'Test',
      dob: 'Jan 1 2000',
      hobbies: 'Test',
      events: 'Test'
    });
    await driver.wait(async () => (await driver.getCurrentUrl()).includes('/login'), 15000);
    const url = await driver.getCurrentUrl();
    expect(url).to.match(/\/login/);
  });
});
