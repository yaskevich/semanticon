USER=yaskevich
APP=semanticon
BRANCH=master

rm -rf semanticon
mkdir -p semanticon
cd semanticon
git clone https://github.com/$USER/$APP --depth 1

cd server
npm install --only=prod
mkdir media
cd ../client
npm install
npm run build
mv dist ../server/public
cd ..
rm -rf ./data

# psql -U pragmaticon_user db_pragmaticon < pragmaticon.psql
# cp .env 
# pm2 start ecosystem.config.cjs
# pm2 save

