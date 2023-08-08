import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './db.js';

const data = await db.getData();

if (Object.keys(data)?.length) {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dir, 'data', 'pragmaticon.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
  await db.release();
  console.log(`Exported: ${filePath}`);
}
