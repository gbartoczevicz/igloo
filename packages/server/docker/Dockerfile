ARG  NODE_VERSION
ARG  PORT

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

CMD npm run start

EXPOSE ${PORT}
