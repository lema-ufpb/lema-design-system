# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Enable dependency caching by copying package files first
COPY package.json package-lock.json ./
# Install libc6-compat for compatibility with native modules on alpine (like Next.js swc)
RUN apk add --no-cache libc6-compat
RUN npm ci --ignore-scripts --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Accept version from build arg (injected by CD workflow)
ARG APP_VERSION

# Build the storybook static files
RUN APP_VERSION=$APP_VERSION npm run build-storybook

# Stage 2: Serve
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the static output from the builder stage to Nginx
COPY --from=builder /app/storybook-static /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Expose port 80 (Standard for HTTP)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
