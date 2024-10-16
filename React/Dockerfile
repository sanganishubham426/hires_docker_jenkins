# Stage 1: Build the React app
FROM node:latest AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Set up npm cache in a designated directory to improve caching
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

# Copy the rest of the application code to the container
COPY . .

# ENV variables from .yml files
#ARG VITE_API_URL

# ENV for the docker image
#ENV VITE_API_URL $VITE_API_URL

# Build the React app for production
RUN npm run build

#CMD ["chmod+x", "777", "build"]

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build output from the builder stage to the Nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy custom Nginx configuration file (if any)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
