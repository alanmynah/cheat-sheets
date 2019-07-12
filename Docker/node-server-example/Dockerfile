# Get base image
FROM node:alpine

WORKDIR /usr/app

COPY . .

# Copying .json separately allows us to avoid
# rerunning npm install if any of our code changes
COPY ./package.json ./package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]