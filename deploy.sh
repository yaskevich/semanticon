# npm i -g degit
# npm install -g @vue/cli
# pm2 stop pragmaticon

rm -rf pragmaticon
rm -rf ui
mkdir -p pragmaticon
cd pragmaticon
degit https://github.com/yaskevich/pragmaticon-database#main

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

# psql -U pragmaticon_user db_pragmaticon < pragmaticon.psql
# cp .env 
# pm2 start ecosystem.config.cjs
# pm2 save

