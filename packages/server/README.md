# Igloo's server

## Requirements

- nodejs: see [.tool-versions](./.tool-versions) entry
- npm: >= 8.3.1
- deno: see [.tool-versions](./.tool-versions) entry (optional for formatting)
- docker: >= 20.10.12 (optional for database and system containers)
- docker-compose: >= 2.3.3 (optional for database and system containers)

## Getting started

- Copy the `.env.example` content into `.env` and set it variable values if
  needed
- Run `npm i` to install all the project dependencies
- Have a PostgreSQL instance running (with the credentials listed at the `.env`
  file)
- Run `npm run database` to startup the application database
- Run `npm run generate` to generate the database client code
- Run `npm run migrate` to migrate the database tables
- Run `npm run build` to transpile the Typescript code into Javascript code at
  `/dist` folder
- Run `npm run start` to start the project
  - You can skip the build and start steps by running `npm run dev`

## Using it

You can import the [`request collection`](.github/docs/request_collection.json)
file into the [Insomnia HTTP Client](https://insomnia.rest) to consult and test
all the system routes.

## Testing

- Copy the `.env.example` content into `.env.test` and set it variable values if
  needed
- You need to startup a testing database with `npm run test:database`
- Execute the Jest testing suit by running `npm run test`

---

Made with 💜 by me! [Stay in touch 👋](https://www.linkedin.com/in/gbartoczevicz)
