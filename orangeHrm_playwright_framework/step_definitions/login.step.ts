import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import { getTestData } from '../utils/dataLoader';

type LoginData = { username: string; password: string };

Given('user launches OrangeHRM application', async function (this: CustomWorld) {
  await this.loginPage.open();
});

When('user logs in with valid credentials', async function (this: CustomWorld) {
  const data = getTestData<{ valid: LoginData }>('loginData.json').valid;
  await this.loginPage.login(data.username, data.password);
});

When('user submits blank credentials', async function (this: CustomWorld) {
  const data = getTestData<{ blank: LoginData }>('loginData.json').blank;
  await this.loginPage.login(data.username, data.password);
});

Then('dashboard should be displayed', async function (this: CustomWorld) {
  await this.dashboardPage.assertDisplayed();
});

Then('login validation message should be displayed', async function (this: CustomWorld) {
  await this.loginPage.assertLoginPage();
});

When('user opens Dashboard Quick Launch', async function (this: CustomWorld) {
  await this.dashboardPage.assertQuickLaunchVisible();
});

Then('Dashboard Quick Launch should be displayed', async function (this: CustomWorld) {
  await this.dashboardPage.assertQuickLaunchVisible();
});
