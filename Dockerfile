FROM node:lts-alpine3.12 AS builder
ARG NEXT_PUBLIC_API_URL=https://next.api.altaysorbent.org/
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
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

