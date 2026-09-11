import { World, setWorldConstructor, type IWorldOptions } from '@cucumber/cucumber';
import { chromium, firefox, webkit, type Browser, type BrowserContext, type Page } from 'playwright';
import { config } from '../utils/config';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { AdminPage } from '../pages/admin.page';
import { PIMPage } from '../pages/pim.page';
import { LeavePage } from '../pages/leave.page';
import { MyInfoPage } from '../pages/myinfo.page';

export class CustomWorld extends World {
  browser!: Browser; context!: BrowserContext; page!: Page; scenarioName = '';
  loginPage!: LoginPage; dashboardPage!: DashboardPage; adminPage!: AdminPage;
  pimPage!: PIMPage; leavePage!: LeavePage; myInfoPage!: MyInfoPage;
  constructor(options: IWorldOptions) { super(options); }
  async createContext(): Promise<void> {
    const browserType = config.browser === 'firefox' ? firefox : config.browser === 'webkit' ? webkit : chromium;
    this.browser = await browserType.launch({ headless: config.headless, slowMo: config.slowMo });
    this.context = await this.browser.newContext({ baseURL: config.baseUrl, recordVideo: { dir: 'reports/videos' } });
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(30000);
    this.page.setDefaultNavigationTimeout(30000);
    this.loginPage = new LoginPage(this.page); this.dashboardPage = new DashboardPage(this.page);
    this.adminPage = new AdminPage(this.page); this.pimPage = new PIMPage(this.page);
    this.leavePage = new LeavePage(this.page); this.myInfoPage = new MyInfoPage(this.page);
  }
  async closeContext(): Promise<void> { await this.context?.close(); await this.browser?.close(); }
}
setWorldConstructor(CustomWorld);
