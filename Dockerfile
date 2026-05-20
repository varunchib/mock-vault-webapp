# ── Stage 1: build ──────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Baked into the JS bundle at build time via Cloudflare Workers GitHub Action.
# This Dockerfile is for local dev only — production builds go through wrangler deploy.
ARG VITE_API_BASE_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_ADMIN_EMAILS
ARG VITE_GA_MEASUREMENT_ID
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_ADMIN_EMAILS=$VITE_ADMIN_EMAILS
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID

RUN npm run build

# ── Stage 2: serve ───────────────────────────────────────────────
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
