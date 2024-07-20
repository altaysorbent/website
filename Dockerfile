FROM node:lts-alpine3.19 AS builder
ARG NEXT_PUBLIC_API_URL=https://next.api.altaysorbent.org
WORKDIR /app
COPY . .
RUN rm -rf .env.local
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
