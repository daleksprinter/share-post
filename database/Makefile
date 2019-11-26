DBNAME:=share_pos
DATASOURCE:=root:password@tcp(0.0.0.0:3306)/$(DBNAME)
PASSWORD:=password

GOOSE:=/Users/ryomac/go/bin/goose

migrate/init:
	mysql -u root -h 0.0.0.0 --protocol tcp -e "create database \`$(DBNAME)\`" -p

migrate/status:
	$(GOOSE)  status

migrate/up:
	$(GOOSE) up

db/reset:
	docker-compose exec share-pos-db mysql -h 0.0.0.0 -u root -p$(PASSWORD) -e "DROP DATABASE if exists $(DBNAME); CREATE DATABASE $(DBNAME);"