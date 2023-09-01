FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn run testnet:build
