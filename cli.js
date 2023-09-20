import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import args from 'args';
import db from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

args
  .option('file', 'Path to CSV file', '')
  .option('scheme', 'Scheme for CSV: f OR r', 'r')
  .option('export', 'Export data to JSON', false);

const options = args.parse(process.argv, { version: false });

if (options.scheme && options.file) {
  // console.log(options.scheme, options.file);
  const fileName = options.file;
  if (fs.existsSync(fileName)) {
    const csvContent = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');
    await db.processCSV(csvContent, options.scheme);
  } else {
    console.log('Path to CSV file is incorrect!');
  }
}

if (options.export) {
  const data = await db.getData();
  if (Object.keys(data)?.length) {
    const dir = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(dir, 'data', 'pragmaticon.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Exported: ${filePath}`);
  }
}
await db.release();
