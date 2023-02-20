FROM node:18-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

VOLUME /usr/app/node_modules

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]