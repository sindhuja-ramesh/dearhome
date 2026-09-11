# ============================================================================
# DearHome - Production Dockerfile for Google Cloud Run
# ============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=8080

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev --no-audit --prefer-offline

# Copy application files
COPY server.js ./
COPY index.html ./
COPY scripts/ ./scripts/

# Expose Cloud Run port
EXPOSE 8080

# Run with non-root security context
USER node

# Start Express.js microservice
CMD ["node", "server.js"]
