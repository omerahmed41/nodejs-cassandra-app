# Dockerfile
# Use Node.js official image as base
FROM node:16

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port and run the app
EXPOSE 3000
CMD ["node", "index.js"]
