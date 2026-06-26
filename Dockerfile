# Multi-stage build for the portfolio Next.js app. Runs as non-root.
FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
RUN npm run build

FROM node:24-bookworm-slim AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app /app
USER node
EXPOSE 3001
# bind loopback only; Caddy on the host proxies to 127.0.0.1:3001
CMD ["npm","run","start","--","-p","3001","-H","127.0.0.1"]
