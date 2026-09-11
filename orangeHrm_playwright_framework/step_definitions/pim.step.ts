import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import { getTestData } from '../utils/dataLoader';

Given('user is on the PIM module', async function (this: CustomWorld) {
  const data = getTestData<{ valid: { username: string; password: string } }>('loginData.json').valid;
  await this.loginPage.open();
  await this.loginPage.login(data.username, data.password);
  await this.dashboardPage.navigateTo('PIM');
});

When('user submits the Add Employee form without required fields', async function (this: CustomWorld) {
  await this.pimPage.validateAddEmployeeRequiredFields();
});

Then('Add Employee required field messages should be displayed', async function (this: CustomWorld) {
  await this.pimPage.assertDisplayed();
});

When('user creates the configured employee', async function (this: CustomWorld) {
  const data = getTestData<{ employee: { firstName: string; lastName: string } }>('employeeData.json');
  await this.pimPage.createEmployee(data.employee.firstName, data.employee.lastName);
});

Then('employee creation should complete', async function (this: CustomWorld) {
  await this.pimPage.assertDisplayed();
});

When('user opens Employee Personal Details', async function (this: CustomWorld) {
  await this.pimPage.openPersonalDetails();
});

Then('Employee Personal Details should be displayed', async function (this: CustomWorld) {
  await this.pimPage.assertDisplayed();
});
