import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import db from './db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const features = await db.getFeatures();
const tokens = await db.getTokens();
const phrases = await db.getPhrases();
const exprs = await db.getExprs();
const units = await db.getUnits();
const idx = await db.getIndex();
const titles = await db.getTitles();
const media = await db.getMedia();
const trans = await db.getTranslations();

// console.log("data", data);
const data = {
  trans,
  media,
  exprs,
  units,
  features,
  titles,
  tokens,
  phrases,
  toc: idx,
};

fs.writeFileSync(path.join(__dirname, 'data', 'pragmaticon.json'), JSON.stringify(data, null, 4), 'utf8');
