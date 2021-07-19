FROM node:14.2.0-alpine3.11

WORKDIR /server

COPY ./package.json ./

RUN npm i

COPY ./ ./ 

CMD "npm" "run" "dev"
