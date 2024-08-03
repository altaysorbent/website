FROM node:lts-alpine3.19 AS builder
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_DOMAIN_URL
ARG NEXT_PUBLIC_PROMO_CODE
WORKDIR /app
COPY . .
RUN rm -rf .env*
RUN npm ci
RUN npm run build
RUN npm prune --production

EXPOSE 3000

CMD [ "npm", "run", "start" ]
