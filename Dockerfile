FROM node:lts-alpine3.19 AS builder
WORKDIR /app
COPY . .
RUN rm -rf .env*
RUN npm ci
RUN npm run build
RUN npm prune --production

EXPOSE 3000

CMD [ "npm", "run", "start" ]
