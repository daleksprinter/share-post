DBNAME:=share_pos
LOCAL_DATASOURCE:=root:password@tcp(0.0.0.0:3306)/$(DBNAME)
LOCAL_PASSWORD:=password

include ./.env

GOOSE:=/Users/ryomac/go/bin/goose

cat:
	echo $(PROD_DATASOURCE)

migrate/init:
	mysql -u root -h 0.0.0.0 --protocol tcp -e "create database \`$(DBNAME)\`" -p

migrate/status:
	$(GOOSE)  status

migrate/up:
	$(GOOSE) up

migrate/create:
	$(GOOSE) create $(NAME) sql

migrate/redo:
	$(GOOSE) redo

db/reset:
	docker-compose exec share-pos-db mysql -h 0.0.0.0 -u root -p$(PASSWORD) -e "DROP DATABASE if exists $(DBNAME); CREATE DATABASE $(DBNAME);"