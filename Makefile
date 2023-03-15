SHELL:=/bin/bash
PROJECT_NAME=polaris-UI
DOCKER_NAME=webui
BUILD_DIR=www/
PORT=8080

build:
	complexity --noserver project/

run:
	complexity --port $(PORT) project/