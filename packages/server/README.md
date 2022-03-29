# Igloo's server

## Requirements

- nodejs: see [.nvmrc](./.nvmrc)
- npm: >= 8.3.1
- deno: >= 1.19.2 (optional for formatting)
- docker: >= 20.10.12 (optional for database and system containers)
- docker-compose: >= 2.3.3 (optional for database and system containers)
- GNU make: >= 4.3 (optional for command shorthand)

## Getting started

- Copy the `.env.example` content into `.env` and set it variable values if
  needed
- Run `npm i` to install all the project dependencies
- Have a PostgreSQL instance running (with the credentials listed at the `.env`
  file)
  - You can use `make db-up` to start a new instance via Docker, Docker Compose
    and GNU make
- Run `npm run generate` to generate the database client code
- Run `npm run migrate` to migrate the database tables
- Run `npm run build` to transpile the Typescript code into Javascript code at
  `/dist` folder
- Run `npm run start` to start the project
  - You can skip the build and start steps by running `npm run dev`

## Using it

You can import the [`request collection`](.github/docs/request_collection.json) file into the [Insomnia HTTP Client](https://insomnia.rest) to consult and test all the system routes.

---

Made with 💜 by me! [Stay in touch 👋](https://www.linkedin.com/in/gbartoczevicz)
