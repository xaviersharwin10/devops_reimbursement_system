# Use a base image with Node.js
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /DEVOPS_REIMBURSEMENT_SYSTEM/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install @fortawesome/fontawesome-svg-core

# Copy the rest of the frontend application code
COPY . .

# Build the frontend application
RUN npm run build

# Expose port 3000 for the Node.js application
EXPOSE 3000

# Command to start the Node.js application
CMD ["npm", "start"]
# # Use NGINX base image for serving static files
# FROM nginx:alpine

# # Copy the built frontend assets to NGINX
# COPY --from=builder /EXPENSE_REIMBURSEMENT_DEVOPS_ASSIGNMENT/client/build /usr/share/nginx/html

# # Expose port 80 for NGINX
# EXPOSE 80

# # Command to start NGINX
# CMD ["nginx", "-g", "daemon off;"]
