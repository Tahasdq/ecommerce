# Use Node.js official image
FROM node:24-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build Next.js app
RUN npm run build

# Expose default Next.js port
EXPOSE 3000

# Start Next.js in production
CMD ["npx", "next", "start"]
