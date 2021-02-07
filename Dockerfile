FROM node:lts-alpine3.12 AS builder
ARG SOURCE_BRANCH
WORKDIR /app
COPY . .
RUN yarn install && yarn build-$SOURCE_BRANCH

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/public .
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]


