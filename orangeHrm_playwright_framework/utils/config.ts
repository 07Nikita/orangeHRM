import 'dotenv/config';
export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com',
  username: process.env.ORANGE_USERNAME ?? 'Admin',
  password: process.env.ORANGE_PASSWORD ?? 'admin123',
  browser: process.env.BROWSER ?? 'chromium',
  headless: process.env.HEADLESS !== 'false',
  slowMo: Number(process.env.SLOW_MO ?? 0)
};
