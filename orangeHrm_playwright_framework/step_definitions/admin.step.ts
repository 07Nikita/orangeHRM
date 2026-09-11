import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import { getTestData } from '../utils/dataLoader';

Given('user is on the Admin module', async function (this: CustomWorld) {
  const data = getTestData<{ valid: { username: string; password: string } }>('loginData.json').valid;
  await this.loginPage.open();
  await this.loginPage.login(data.username, data.password);
  await this.dashboardPage.navigateTo('Admin');
});

When('user searches for the configured system user', async function (this: CustomWorld) {
  const data = getTestData<{ searchUser: { username: string } }>('adminUsers.json');
  await this.adminPage.searchUser(data.searchUser.username);
});

Then('the configured system user should be listed', async function (this: CustomWorld) {
  await this.adminPage.assertDisplayed();
});

When('user resets System User filters', async function (this: CustomWorld) {
  await this.adminPage.resetFilters();
});

Then('System User filters should be reset', async function (this: CustomWorld) {
  await this.adminPage.assertDisplayed();
});

When('user submits the Add User form without required fields', async function (this: CustomWorld) {
  await this.adminPage.validateAddUserRequiredFields();
});

Then('Add User required field messages should be displayed', async function (this: CustomWorld) {
  await this.adminPage.assertRequiredMessages();
});
