PKG:=yarn
DEPLOY:=build:prod
GOURCE:=gource

help:
	@echo
	@echo "✍🏽  Please use 'make <target>' where <target> is one of the commands below:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e "s/\\$$//" | sed -e "s/##//"
	@echo

# ------------------------------------------------------------------------------------ #

build: ## build locally the files
	$(PKG) build

build-prod: ## build on a prod-version
	$(PKG) $(DEPLOY)

change-version: ## change the project version
	$(PKG) version

clean: ## make it clean, pls sir
	$(PKG) clean-files

deploy: build-prod

install: ## install missing dependencies
	$(PKG)

i: install

pack: ## pack project in case of develirable
	$(PKG) pack

server: ## runs locally on a 3000 port pre-defined on package.json
	$(PKG) server

run: server
serve: run

start: clean build run

test: ## tests alien-registration e2e tests
	$(PKG) test

test-unit: ## runs alien-registration unit tests
	$(PKG) test:unit

test-unit-watch: ## watches for unit tests modification
	$(PKG) test:unit-watch

tests: test test-unit

watch: ## watch what's important to
	$(PKG) watch

gource:
	@echo "No '$(GOURCE)' task was settled up 😞"
