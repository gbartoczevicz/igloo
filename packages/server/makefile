image_name := projetinho/server

docker_dir := docker/Dockerfile

node_version := $(shell cat .nvmrc | sed 's|[^0-9]*||')

docker-build:
	docker build --build-arg NODE_VERSION=$(node_version) -t $(image_name) -f $(docker_dir) .

docker-start:
	docker run -dp 3333:3333 $(image_name)
