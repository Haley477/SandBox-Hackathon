FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build TypeScript code
RUN npm run build

# Create views directory in dist and copy HTML files
RUN mkdir -p dist/views
RUN cp -r src/views/* dist/views/

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "dist/index.js"]