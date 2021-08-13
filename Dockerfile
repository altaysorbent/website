FROM node:lts-alpine3.12 AS builder
ARG NEXT_PUBLIC_API_URL=https://next.api.altaysorbent.org
ARG NEXT_PUBLIC_PROMO_CODE=
WORKDIR /app
COPY . .
RUN rm -rf .env.local
RUN yarn install
RUN yarn add sharp
RUN yarn build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/out .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
