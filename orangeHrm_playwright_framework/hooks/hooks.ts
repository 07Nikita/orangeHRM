import { After, AfterStep, Before, BeforeStep, Status, setDefaultTimeout } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import { captureScreenshot } from '../utils/screenshots';
import { logger } from '../utils/logger';
import fs from 'node:fs';
import path from 'node:path';

setDefaultTimeout(30000);

Before(async function (this: CustomWorld, scenario) {
  this.scenarioName = scenario.pickle.name;
  fs.mkdirSync(path.resolve('reports/traces'), { recursive: true });
  fs.mkdirSync(path.resolve('reports/videos'), { recursive: true });
  await this.createContext();
  await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
});
BeforeStep(async function (this: CustomWorld) { logger.info(`Starting step in: ${this.scenarioName}`); });
AfterStep(async function (this: CustomWorld, step) {
  if (step.result?.status === Status.FAILED && this.page) {
    const file = await captureScreenshot(this.page, `${this.scenarioName}-step-failure`);
    await this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
    logger.error(`Failure screenshot saved: ${file}`);
  }
});
After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const file = await captureScreenshot(this.page, `${this.scenarioName}-failure`);
    await this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
    logger.error(`Failure screenshot saved: ${file}`);
  }
  if (this.context) await this.context.tracing.stop({ path: `reports/traces/${this.scenarioName.replace(/[^a-z0-9-_]/gi, '_')}.zip` });
  await this.closeContext();
});
