import { expect, type Locator, type Page } from '@playwright/test';
export class LeavePage {
  readonly heading: Locator; readonly applyLink: Locator; readonly fromDate: Locator; readonly toDate: Locator; readonly applyButton: Locator; readonly requiredMessages: Locator; readonly dateError: Locator;
  constructor(private readonly page: Page) {
    // Match any date input that contains year placeholder to be resilient to placeholder format changes
    const dates = page.locator('input[placeholder*="yyyy"]');
    this.heading = page.getByRole('heading', { name: 'Leave', exact: true });
    this.applyLink = page.getByRole('link', { name: 'Apply' });
    this.fromDate = dates.first();
    this.toDate = dates.last();
    this.applyButton = page.getByRole('button', { name: 'Apply' });
    this.requiredMessages = page.getByText('Required');
    // Prefer the explicit error message element used by the app UI to avoid text-match ambiguities
    this.dateError = page.locator('.oxd-input-field-error-message').first();
  }
  async assertDisplayed(): Promise<void> { await expect(this.heading).toBeVisible({ timeout: 30000 }); }
  async waitForPageReady(): Promise<void> { await expect(this.page.locator('.oxd-loading-spinner')).toBeHidden({ timeout: 30000 }); }
  async validateMandatoryFields(): Promise<void> { await this.waitForPageReady(); await this.applyLink.click(); await this.applyButton.click(); await expect(this.requiredMessages.first()).toBeVisible({ timeout: 30000 }); }
  async validateIncorrectDateRange(from: string, to: string): Promise<void> {
    await this.waitForPageReady();
    await this.applyLink.click();
    // ensure date inputs are visible before interacting
    await expect(this.fromDate).toBeVisible({ timeout: 5000 });
    await this.fromDate.fill(from);
    await this.toDate.fill(to);
    await this.applyButton.click();
    await expect(this.dateError).toBeVisible({ timeout: 30000 });
  }
}
