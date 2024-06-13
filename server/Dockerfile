# Use the official Node.js image as base
FROM node:18-alpine

# Install bash
RUN apk add --no-cache bash

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY ./package*.json ./

# Install necessary dependencies for bcrypt
RUN apk add --no-cache \
    python3 \
    make \
    g++

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code to the container
COPY ./server ./server
COPY ./database ./database
COPY ./ssl ./ssl


# Expose the port on which the application will run
EXPOSE $SERVER_PORT

# Command to run your Node.js application
CMD npm run express-server --loglevel=verbose
