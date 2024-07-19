FROM node:lts-alpine3.19 AS builder
ARG NEXT_PUBLIC_API_URL=https://next.api.altaysorbent.org
ARG NEXT_PUBLIC_PROMO_CODE=''
ARG NEXT_CONTENTFUL_ACCESS_TOKEN=''
ARG NEXT_CONTENTFUL_SPACE_ID=''
WORKDIR /app
COPY . .
RUN rm -rf .env.local
RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
