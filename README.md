# The Database of Russian Discourse Formulas (backend)

This repository contains a backend only. Frontend code is located [here](https://github.com/yaskevich/pragmaticon).

#### Installation and deployment

This is a regular NodeJS/ExpressJS application with PostgreSQL storage.

`npm install`

`node parser.js <filename.csv>` – to import data into the database

`node index.js` (or other proper way to deploy) to make data available to users

#### Structure of .env file 

```shell
PGUSER=pragmaticon_user
PGHOST=127.0.0.1
PGPASSWORD=..............
PGDATABASE=db_pragmaticon
PGPORT=5432
PORT=8000
```

------

## Full project deployment (backend + static content + frontend)

Requirements:

- PostgreSQL: create  an empty **database** (e.g. *db_pragmaticon*) and a **user** (e.g. *pragmaticon_user*) with access rights allowing to change the database
- NodeJS (v.12 / v.14)
- The NodeJS packages `degit`, PM2 and Vue CLI should be installed globally: `npm i -g degit pm2 @vue/cli`.

You can find the commands listed below in [deploy.sh](/deploy.sh). Some sections are commented out, since loading dump into a database requires special setup. With Ubuntu/PostgreSQL default settings it usually requires changing user to **postgres**.

1. Navigate to a directory that is to be a root of the project.

```bash
rm -rf pragmaticon
rm -rf ui
mkdir -p pragmaticon
cd pragmaticon
degit https://github.com/yaskevich/pragmaticon-database#main
```

2. There is a file `pragmaticon.psql`. Use it to prepare a database.

```psql -U pragmaticon_user db_pragmaticon < pragmaticon.psql```

3. Install backend packages, upload media, build frontend, remove files that are not used in production.


```bash
npm install --only=prod
mkdir media && cd media
degit https://github.com/yaskevich/pragmaticon-media#main
cd ..
mkdir ui && cd ui
degit https://github.com/yaskevich/pragmaticon#main
npm install
npm run build
mv dist ../public
cd ..
rm -rf ui parser.js pragmaticon.psql check.sh
```

4. If you are going to use `node`/`nodemon` (not recommended for production), you can put all the required environmental variables into `.env` file according to the **description above**.

   For PM2 (**recommended**), you can add the variables either into newly created `.env` or into already existing `ecosystem.config.cjs`

5. Run the project with PM2 and save settings to make it autostart

   ```bash
   pm2 start ecosystem.config.cjs
   pm2 save
   ```

6. Deploying behind a frontend proxy, one has to set up a virtual host and apply a Proxy Pass directive, e.g. for *Nginx*:

```nginx
location / {
			proxy_pass http://127.0.0.1:8000;
		}
```

7. That's it!

:space_invader: