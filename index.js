import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use('/api/media', express.static(path.join(__dirname, 'media')));
app.use(express.static('public'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  history({
    // verbose: true,
    rewrites: [{ from: /\/api\/.*$/, to: (context) => context.parsedUrl.pathname }],
  })
);

app.get('/api/data', async (req, res) => res.json(await db.getData()));

app.get('/api/icon/:id', async (req, res) => {
  const id = Number(req.params.id) === 2 ? 2 : 1;
  res.sendFile(`${__dirname}/${id}.png`);
});

app.listen(port);
console.log(`Backend is at port ${port}`);
