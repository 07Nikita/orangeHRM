import { expect, type Locator, type Page } from '@playwright/test';
export class DashboardPage {
  readonly heading: Locator; readonly sideNavigation: Locator; readonly quickLaunch: Locator; readonly widgets: Locator;
  constructor(private readonly page: Page) { this.heading = page.getByRole('heading', { name: 'Dashboard' }); this.sideNavigation = page.getByRole('navigation'); this.quickLaunch = page.getByText('Quick Launch'); this.widgets = page.locator('.oxd-grid-item'); }
  async assertDisplayed(): Promise<void> { await expect(this.heading).toBeVisible({ timeout: 30000 }); }
  async assertWidgetsVisible(): Promise<void> { await expect(this.quickLaunch).toBeVisible({ timeout: 30000 }); await expect(this.widgets.first()).toBeVisible({ timeout: 30000 }); }
  async navigateTo(moduleName: string): Promise<void> {
    // Use a non-exact match to be resilient to minor label changes and wait for navigation to complete
    const navItem = this.sideNavigation.getByText(moduleName, { exact: false }).first();
    await navItem.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
  async assertQuickLaunchVisible(): Promise<void> { await expect(this.quickLaunch).toBeVisible({ timeout: 30000 }); }
}
