# stage 0: build

FROM node:16-alpine as build

WORKDIR /app

ENV UPLOAD_SENTRY_SOURCEMAPS=false
COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn run mainnet:build

# stage 1: webserver
FROM nginx:1.25-alpine
COPY --from=build /app/out/ /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
