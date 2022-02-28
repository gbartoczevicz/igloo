docker_dir := ./docker

node_version := $(shell cat .nvmrc | sed 's|[^0-9]*||')

docker-build:
	docker build --build-arg NODE_VERSION=$(node_version) $(docker_dir)