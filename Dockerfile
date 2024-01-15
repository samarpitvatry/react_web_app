# Step 1: Use a Node base image
FROM node:latest as build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of your app's source code
COPY . ./

# Step 5: Build your app
RUN npm run build

# Step 6: Use Nginx to serve the app
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]