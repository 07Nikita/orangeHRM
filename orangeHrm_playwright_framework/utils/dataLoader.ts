import fs from 'node:fs';
import path from 'node:path';
export function getTestData<T>(fileName: string): T {
  const filePath = path.resolve(__dirname, '..', 'test-data', fileName);
  if (!fs.existsSync(filePath)) throw new Error(`Test data file not found: ${filePath}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}
