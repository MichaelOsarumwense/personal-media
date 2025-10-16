import { expect } from 'chai';
import { createDriver, teardownDriver } from '../../src/core/driver.js';
import { onFailCapture } from '../_helpers.js';
import { LoginPage } from '../../src/pages/login.page.js';

let driver; let login;

describe('Routing & Protection @smoke', function () {
  this.timeout(30000);

  before(async () => { driver = await createDriver(); login = new LoginPage(driver); });
  after(async () => { await teardownDriver(driver); });
  afterEach(async function() { await onFailCapture(driver, this.currentTest); });

  it('redirects unauthenticated users to /login', async () => {
    await driver.get(`${process.env.BASE_URL}/`);
    // Expect login form submit button to be present
    const present = await login.isPresent(login.submit);
    expect(present).to.equal(true);
  });
});
