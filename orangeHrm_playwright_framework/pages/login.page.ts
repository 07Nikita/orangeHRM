import { expect, type Locator, type Page } from '@playwright/test';
export class LoginPage {
  readonly username: Locator; readonly password: Locator; readonly loginButton: Locator;
  constructor(private readonly page: Page) { this.username = page.getByPlaceholder('Username'); this.password = page.getByPlaceholder('Password'); this.loginButton = page.getByRole('button', { name: 'Login' }); }
  async open(): Promise<void> { await this.page.goto('/web/index.php/auth/login', { waitUntil: 'domcontentloaded' }); await expect(this.loginButton).toBeVisible({ timeout: 30000 }); }
  async login(username: string, password: string): Promise<void> { await this.username.fill(username); await this.password.fill(password); await this.loginButton.click(); }
  async assertLoginPage(): Promise<void> { await expect(this.loginButton).toBeVisible({ timeout: 30000 }); }
}
