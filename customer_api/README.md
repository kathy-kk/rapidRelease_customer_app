## Environment
   aws lamda
   mongoDB atlas

## Install
npm i -g serverless

serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxx

npm install

cp  .env.example .env

config mongoDB atlas and fill DB path in .env


## Local
npm run start

## Deployment
serverless deploy


