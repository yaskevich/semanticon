# Pragmaticon Backend
#### Pragmaticon is a Database of Russian Discourse Formulae &amp; Routines
---

This is a regular NodeJS/ExpressJS application with PostgreSQL storage.

`npm install`

`node parser.js <filename.csv>` &ndash; to import data into the database

`node export.js` &ndash; to export data from the database and store it in `data` subdirectory

`node index.js` (or other proper way to deploy) &ndash; to make data available to users

#### The variables in the `.env` file

```shell
# PostgreSQL database name
PGDATABASE=.............
# PostgreSQL user name
PGUSER=.................
# PostgreSQL password
PGPASSWORD=.............
# Optional. PostgreSQL host (IP or hostname)
# Default value is 127.0.0.1
PGHOST=127.0.0.1
# Optional. PostgreSQL port
# Default value is 5432
PGPORT=5432
# Optional. Application port
# Default value is 8080
PORT=8080
```
---

## I. Deploying a static build

- set up the application locally, as it is described in the section II below
- generate JSON file via `export.js`
- host the [mediafiles](https://github.com/yaskevich/pragmaticon-media) somewhere
- build the [client app](https://github.com/yaskevich/pragmaticon-ui), putting the ***link to the host with mediafiles*** and the ***path to the generated JSON*** in environment variables
- upload the build to any hosting platform for static files
- stop (or delete) the database

---

## II. Deploying a project in full (backend + mediafiles + frontend)

Requirements:

- PostgreSQL: create an empty **database** (e.g. _db_pragmaticon_) and a **user** (e.g. _pragmaticon_user_) with access rights allowing to change the database
- NodeJS v12+

You can find the commands listed below in [deploy.sh](/deploy.sh). Some sections are commented out, since loading dump into a database requires special setup. In Ubuntu/PostgreSQL default environment it usually requires switching user to **postgres**.

1. Navigate to a directory that is to be a root of the project.

```bash
rm -rf pragmaticon
rm -rf ui
mkdir -p pragmaticon
cd pragmaticon
git clone https://github.com/yaskevich/pragmaticon-database . --depth 1
```

2. There is a file `pragmaticon.psql`. Use it to prepare a database.

```bash
psql -U pragmaticon_user db_pragmaticon < pragmaticon.psql
```

3. Install backend packages, upload media, build frontend, remove files that are not used in production.

```bash
npm install --only=prod
mkdir media && cd media
git clone https://github.com/yaskevich/pragmaticon-media . --depth 1
cd ..
mkdir ui && cd ui
git clone https://github.com/yaskevich/pragmaticon-ui . --depth 1
npm install
npm run build
mv dist ../public
cd ..
rm -rf ui parser.js pragmaticon.psql check.sh
```

4. If you are going to use `node`/`nodemon` (not recommended for production), you can put all the required environment variables into `.env` file according to the _description above_.

   For PM2 (**recommended**), you can add the variables either into newly created `.env` or into already existing `ecosystem.config.cjs`

5. Run the project with PM2 and save settings to make it autostart

```bash
pm2 start ecosystem.config.cjs
pm2 save
```

6. Deploying behind a frontend proxy, one has to set up a virtual host and apply a Proxy Pass directive, e.g. for _Nginx_:

```nginx
location / {
	proxy_pass http://127.0.0.1:8080;
}
```

7. That's it!

:space_invader:
