import { expect, type Locator, type Page } from '@playwright/test';
export class MyInfoPage {
  readonly personalDetails: Locator; readonly tabs: Locator; readonly saveButtons: Locator;
  constructor(private readonly page: Page) { this.personalDetails = page.getByRole('heading', { name: 'Personal Details' }); this.tabs = page.locator('.orangehrm-tabs-item'); this.saveButtons = page.getByRole('button', { name: 'Save' }); }
  async assertTabsAndControls(): Promise<void> { await expect(this.personalDetails).toBeVisible({ timeout: 30000 }); await expect(this.tabs.first()).toBeVisible({ timeout: 30000 }); await expect(this.saveButtons.first()).toBeVisible({ timeout: 30000 }); }
}
