import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import args from 'args';
import db from './db.js';

args
  .option('in', 'Filename or absolute path to CSV file', '')
  .option('stats', 'Show frequency of every unit (statistics)', false)
  .option('content', 'Content structure of CSV file: f OR r', 'r')
  .option('out', 'Filename or absolute path to JSON', '');

const options = args.parse(process.argv, { version: false });
const curDir = path.dirname(fileURLToPath(import.meta.url));
// fs.mkdirSync(curDir, { recursive: true });

if (options.in || options.out) {
  console.log(`Current directory: ${curDir}`);
  console.log('Both relative and absolute paths are supported as arguments parameters.');
}

if (options.content && options.in) {
  const filePath = path.isAbsolute(options.in) ? options.in : path.join(curDir, options.in);
  if (fs.existsSync(filePath)) {
    const csvContent = fs.readFileSync(filePath, 'utf-8');
    await db.processCSV(csvContent, options.content);
    console.log(`Imported: ${filePath}`);
  } else {
    console.log('Path to CSV file is incorrect!');
  }
}

if (options.out) {
  const data = await db.getData();
  const filePath = path.isAbsolute(options.out) ? options.out : path.join(curDir, options.out);
  if (Object.keys(data)?.length) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Exported: ${filePath}`);
  } else {
    console.log('Database returned an error!');
  }
}

if (options.stats) {
  await db.getStats();
}

await db.release();
