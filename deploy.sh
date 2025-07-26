git pull
yarn run build
pm2 delete "Ozi-web-next-js-dev"
pm2 start npm --name "Ozi-web-next-js-dev" -- start
