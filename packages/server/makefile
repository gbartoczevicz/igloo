env_file_args := .env

up:
	docker-compose --env-file $(env_file_args) up

up-db:
	docker-compose --env-file $(env_file_args) up database

fmt:
	deno fmt --config deno.json
