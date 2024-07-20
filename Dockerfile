FROM node:lts-alpine3.19 AS builder
WORKDIR /app
COPY . .
RUN rm -rf .env.local
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
