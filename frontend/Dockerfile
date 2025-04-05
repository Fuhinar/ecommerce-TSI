FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies (use npm ci for faster installation in CI/CD environments)
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the frontend
RUN npm run build

EXPOSE 80

CMD ["npm", "start"]
