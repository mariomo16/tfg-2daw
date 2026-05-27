# Use the Node alpine official image
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy the files to the container image
COPY package.json pnpm-lock.yaml ./

# Install packages
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy local code to the container image.
COPY . ./

# Build the app.
RUN pnpm run build

RUN find dist -type f | head -30

EXPOSE 4200

# Serve the app
CMD ["node", "server.js"]