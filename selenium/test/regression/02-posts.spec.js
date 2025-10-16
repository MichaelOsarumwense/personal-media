import { expect } from 'chai';
import { createDriver, teardownDriver } from '../../src/core/driver.js';
import { onFailCapture } from '../_helpers.js';
import { LoginPage } from '../../src/pages/login.page.js';
import { HomePage } from '../../src/pages/home.page.js';
import { EditPostPage } from '../../src/pages/edit-post.page.js';

let driver; let login; let home; let edit;

function uniq(prefix) { return `${prefix}-${Date.now()}-${Math.floor(Math.random()*1000)}`; }

describe('Posts CRUD', function () {
  this.timeout(90000);

  before(async function () {
    if (String(process.env.ALLOW_POST_MUTATIONS || 'true') !== 'true') this.skip();
    driver = await createDriver();
    login = new LoginPage(driver);
    home = new HomePage(driver);
    edit = new EditPostPage(driver);

    const email = process.env.TEST_USER_EMAIL; const password = process.env.TEST_USER_PASSWORD;
    if (!email || !password) this.skip();
    await login.goto();
    await login.login(email, password);
    await home.waitLoaded();
  });

  after(async () => { await teardownDriver(driver); });
  afterEach(async function() { await onFailCapture(driver, this.currentTest); });

  it('creates a new post and sees it', async () => {
    const text = uniq('e2e-post');
    await home.createPost(text);
    // verify text present
    const found = await driver.findElements({xpath: `//*[contains(text(), ${JSON.stringify(text)})]`});
    expect(found.length).to.be.greaterThan(0);
  });

  it('edits a post', async () => {
    const target = uniq('e2e-edit');
    await home.createPost(target);
    const opened = await home.openEditForPostContaining(target);
    expect(opened).to.equal(true);
    const updated = target + '-updated';
    await edit.update(updated);
    await home.waitLoaded();
    const found = await driver.findElements({xpath: `//*[contains(text(), ${JSON.stringify(updated)})]`});
    expect(found.length).to.be.greaterThan(0);
  });

  it('deletes a post', async () => {
    const target = uniq('e2e-delete');
    await home.createPost(target);
    const deleted = await home.deletePostContaining(target);
    expect(deleted).to.equal(true);
  });
});
