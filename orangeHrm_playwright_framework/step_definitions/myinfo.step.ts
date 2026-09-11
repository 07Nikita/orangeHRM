import { Given, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import { getTestData } from '../utils/dataLoader';

Given('user is on the My Info module', async function (this: CustomWorld) {
  const data = getTestData<{ valid: { username: string; password: string } }>('loginData.json').valid;
  await this.loginPage.open();
  await this.loginPage.login(data.username, data.password);
  await this.dashboardPage.navigateTo('My Info');
});

Then('My Info tabs and controls should be visible', async function (this: CustomWorld) {
  await this.myInfoPage.assertTabsAndControls();
});
