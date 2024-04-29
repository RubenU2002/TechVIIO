# Back
FROM node:20-alpine3.17

RUN npm install nodemon -g

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["nodemon", "index.js"]
