import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import { getTestData } from '../utils/dataLoader';

Given('user is logged in to OrangeHRM', async function (this: CustomWorld) {
  const data = getTestData<{ valid: { username: string; password: string } }>('loginData.json').valid;
  await this.loginPage.open();
  await this.loginPage.login(data.username, data.password);
  await this.dashboardPage.assertDisplayed();
});

Then('dashboard widgets should be visible', async function (this: CustomWorld) {
  await this.dashboardPage.assertWidgetsVisible();
});

When('user navigates to {string}', async function (this: CustomWorld, moduleName: string) {
  await this.dashboardPage.navigateTo(moduleName);
});

Then('{string} page should be displayed', async function (this: CustomWorld, pageName: string) {
  if (pageName === 'System Users') {
    await this.adminPage.assertDisplayed();
  } else if (pageName === 'PIM') {
    await this.pimPage.assertDisplayed();
  } else {
    throw new Error(`Unsupported page: ${pageName}`);
  }
});
