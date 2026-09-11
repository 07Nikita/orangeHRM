import fs from 'node:fs';
import path from 'node:path';
import type { Page } from 'playwright';
export async function captureScreenshot(page: Page, name: string): Promise<string> {
  const directory = path.resolve(process.cwd(), 'screenshots');
  fs.mkdirSync(directory, { recursive: true });
  const filePath = path.join(directory, `${name.replace(/[^a-z0-9-_]/gi, '_')}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}
