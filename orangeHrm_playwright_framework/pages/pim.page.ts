import { expect, type Locator, type Page } from '@playwright/test';
export class PIMPage {
  readonly heading: Locator; readonly addEmployeeHeading: Locator; readonly addButton: Locator; readonly firstName: Locator; readonly lastName: Locator; readonly saveButton: Locator; readonly requiredMessages: Locator;
  constructor(private readonly page: Page) {
    // Use less strict locators (remove exact:true) to make selectors more resilient to minor UI changes
    this.heading = page.getByRole('heading', { name: 'PIM' });
    this.addEmployeeHeading = page.getByRole('heading', { name: 'Add Employee' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.requiredMessages = page.getByText('Required');
  }
  async assertDisplayed(): Promise<void> { await expect(this.heading).toBeVisible({ timeout: 30000 }); }
  async waitForPageReady(): Promise<void> { await expect(this.page.locator('.oxd-loading-spinner')).toBeHidden({ timeout: 30000 }); }
  async validateAddEmployeeRequiredFields(): Promise<void> { await this.waitForPageReady(); await expect(this.addButton).toBeVisible({ timeout: 30000 }); await this.addButton.click({ force: true }); await expect(this.addEmployeeHeading).toBeVisible({ timeout: 30000 }); await this.saveButton.click(); await expect(this.requiredMessages.first()).toBeVisible({ timeout: 30000 }); }
  async createEmployee(firstName: string, lastName: string): Promise<void> { await this.waitForPageReady(); await expect(this.addButton).toBeVisible({ timeout: 30000 }); await this.addButton.click({ force: true }); await expect(this.addEmployeeHeading).toBeVisible({ timeout: 30000 }); await this.firstName.fill(firstName); await this.lastName.fill(lastName); await this.saveButton.click(); }
  async openPersonalDetails(): Promise<void> { await this.page.getByRole('link', { name: /Employee List/i }).click(); await expect(this.page.getByText('Employee Information')).toBeVisible({ timeout: 30000 }); }
}
