# Use a base image with Node.js
FROM node:18

# Set the working directory in the container
WORKDIR /DEVOPS_REIMBURSEMENT_SYSTEM/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the backend application code
COPY . .

# Expose the port your backend application listens on
EXPOSE 8085

# Command to run your backend application
CMD ["npm", "run", "server"]
