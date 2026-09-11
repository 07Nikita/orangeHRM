import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import { getTestData } from '../utils/dataLoader';

Given('user is on the Leave module', async function (this: CustomWorld) {
  const data = getTestData<{ valid: { username: string; password: string } }>('loginData.json').valid;
  await this.loginPage.open();
  await this.loginPage.login(data.username, data.password);
  await this.dashboardPage.navigateTo('Leave');
});

When('user submits Leave Apply without mandatory fields', async function (this: CustomWorld) {
  await this.leavePage.validateMandatoryFields();
});

Then('Leave mandatory field messages should be displayed', async function (this: CustomWorld) {
  await this.leavePage.assertDisplayed();
});

When('user submits an incorrect Leave date range', async function (this: CustomWorld) {
  const data = getTestData<{ invalidRange: { fromDate: string; toDate: string } }>('leaveData.json');
  await this.leavePage.validateIncorrectDateRange(data.invalidRange.fromDate, data.invalidRange.toDate);
});

Then('Leave date range validation should be displayed', async function (this: CustomWorld) {
  await this.leavePage.assertDisplayed();
});
