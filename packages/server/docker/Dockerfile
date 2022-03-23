ARG  NODE_VERSION
ARG  PORT

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY . .

RUN npm i
RUN npm run generate
RUN npm run build

ADD https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for wait-for
RUN chmod +x wait-for
RUN ls