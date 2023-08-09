import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool();

const release = async () => pool.end();

const formatSQL = async (sql, key, func) => {
  let data = {};
  try {
    const res = await pool.query(sql);
    data = Object.assign({}, ...(res.rows.map((x) => ({ [x[key]]: func(x) }))));
  } catch (error) {
    console.log(error);
  }
  return data;
};

const getTranslations = async () => formatSQL('SELECT * FROM translations', 'id', (x) => (x));

const getMedia = async () => formatSQL('SELECT * FROM media', 'id', (x) => (x.filename + x.fileext));

const getExprs = async () => formatSQL('SELECT * FROM exprs', 'eid', (x) => (x.expr));

const getFeatures = async () => formatSQL('SELECT id, ru, groupid AS class FROM features', 'id', (x) => ([x.ru, x.class]));

const getPhrases = async () => {
  const res = await pool.query('SELECT * FROM phrases');
  return res.rows;
};

const getTokens = async () => {
  const res = await pool.query('SELECT * FROM tokens');
  const keys = [];
  const values = [];
  for (const item of res.rows) {
    keys.push(item.id);
    values.push(item.token);
  }
  return { keys, values };
};

const getIndex = async () => {
  const res = await pool.query('SELECT units.id, units.pid, phrase->0 AS eid1 FROM units INNER JOIN phrases ON units.pid = phrases.pid');
  const data = {};
  for (const item of res.rows) {
    const eid = String(item?.eid1);
    const pid = String(item?.pid);
    const id = String(item?.id);

    if (eid in data) { /* eslint-disable-next-line no-unused-expressions */
      pid in data[eid] ? data[eid][pid].push(id) : data[eid][pid] = [id];
    } else {
      data[eid] = { [pid]: [id] };
    }
  }
  return data;
};

const getTitles = async () => {
  const res = await pool.query('SELECT phrase->0 as eid1, phrase FROM units INNER JOIN phrases ON units.pid = phrases.pid;');
  const eid1 = [];
  const exprs = [];

  for (const item of res.rows) {
    for (const part of item.phrase) {
      exprs.push(part);
      eid1.push(item.eid1);
    }
  }
  return { eid1, exprs };
};

const getUnits = async () => {
  const res = await pool.query('SELECT units.*, phrase, phrase->0 as eid1 FROM units INNER JOIN phrases ON units.pid = phrases.pid', []);
  const units = {};
  // remove empty properties
  for (const item of res.rows) {
    Object.keys(item).forEach((key) => (item[key] == null || ((Array.isArray(item[key]) || typeof item[key] === 'string') && !item[key].length)) && delete item[key]);
    units[item.id] = item;
  }
  return units;
};

const getData = async () => {
  const features = await getFeatures();
  const tokens = await getTokens();
  const phrases = await getPhrases();
  const exprs = await getExprs();
  const units = await getUnits();
  const toc = await getIndex();
  const titles = await getTitles();
  const media = await getMedia();
  const trans = await getTranslations();
  const data = {
    trans, media, exprs, units, features, titles, tokens, phrases, toc,
  };
  return data;
};

export default {
  release,
  getPhrases,
  getTranslations,
  getMedia,
  getIndex,
  getTitles,
  getFeatures,
  getUnits,
  getExprs,
  getTokens,
  getData,
};
