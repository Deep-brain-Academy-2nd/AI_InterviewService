FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app


copy ./ /usr/src/app/


EXPOSE 3000

RUN npm install

CMD [ "npm","run", "dev" ]