# Node.js 20 Image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port and start application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
