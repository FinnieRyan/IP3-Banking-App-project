# Use the official Node.js image as base
FROM node:16-alpine

# take environment variables
ARG NODE_ENV=prod
ARG PORT=8080
ENV NODE_ENV=$NODE_ENV
ENV PORT=$SERVER_PORT

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN if [ "$NODE_ENV" = "dev" ]; then \
    npm install; \
    else \
    npm install --omit-dev; \
    fi

# Copy the rest of the application code to the container
COPY server/ ./
COPY ./ssl ./ssl

# Expose port 3000 (or the port your application is listening on)
EXPOSE $PORT

# Command to run your Node.js application
CMD npm run $NODE_ENV --loglevel=verbose
