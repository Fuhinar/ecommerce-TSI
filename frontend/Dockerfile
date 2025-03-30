# frontend/Dockerfile

# ---------- STAGE 1: Build the React app ----------
    FROM node:18-alpine AS build
    WORKDIR /app
    COPY package.json package-lock.json ./
    RUN npm ci
    COPY . .
    RUN npm run build
    
    # ---------- STAGE 2: Nginx to serve the build ----------
    FROM nginx:1.23-alpine
    # Remove default config and add our own
    RUN rm /etc/nginx/conf.d/default.conf
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copy built React files to Nginx html folder
    COPY --from=build /app/build /usr/share/nginx/html
    
    # Expose port 80
    EXPOSE 80
    
    CMD ["nginx", "-g", "daemon off;"]
    