import { expect, type Locator, type Page } from '@playwright/test';
export class AdminPage {
  readonly heading: Locator; readonly addButton: Locator; readonly searchButton: Locator; readonly resetButton: Locator; readonly username: Locator; readonly requiredMessages: Locator;
  constructor(private readonly page: Page) { 
    // Relax heading locator to avoid exact match issues
    this.heading = page.getByRole('heading', { name: /System Users/i });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.username = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).getByRole('textbox');
    this.requiredMessages = page.getByText('Required');
  }
  async assertDisplayed(): Promise<void> { await expect(this.heading).toBeVisible({ timeout: 30000 }); }
  async searchUser(username: string): Promise<void> { await this.username.fill(username); await this.searchButton.click(); }
  async resetFilters(): Promise<void> { await this.resetButton.click(); }
  async validateAddUserRequiredFields(): Promise<void> { await this.addButton.click(); await this.page.getByRole('button', { name: 'Save' }).click(); await expect(this.requiredMessages.first()).toBeVisible({ timeout: 30000 }); }
  async assertRequiredMessages(): Promise<void> { await expect(this.requiredMessages.first()).toBeVisible({ timeout: 30000 }); }
}
