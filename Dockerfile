FROM node:9-slim
WORKDIR /gs-ser-app
COPY package.json /gs-ser-app
RUN npm install
COPY . /gs-ser-app
CMD [ "npm", "start" ]