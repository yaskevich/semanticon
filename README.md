The Database of Russian Discourse Formulas (backend)



#### Installation and deployment

This is a regular NodeJS/ExpresJS application with PostgreSQL storage.

`npm install`

`node parser.js <filename.csv>` – to import data into the database

`node index.js` (or other proper way to deploy) to make data available to users

#### Structure of .env file 

```PGUSER=....
PGHOST=127.0.0.1
PGPASSWORD=....
PGDATABASE=discourse
PGPORT=5432
PORT=80
```