ARG  NODE_VERSION
ARG  PORT

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY . .

# Find a way to connect to database from container
RUN npm i
RUN npm run generate
RUN npm run build

CMD npm run start

EXPOSE ${PORT}
