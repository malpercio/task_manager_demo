FROM node:carbon-alpine
WORKDIR /source
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8080
EXPOSE 1337
CMD [ "npm", "start" ]
