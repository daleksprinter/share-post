GOOSE=$(which goose)
include ./.env

migrate/create:
	$(GOOSE) create $(NAME) sql 

#local environment
local-migrate/init:
	mysql -u $(LOCAL_USER) -h $(LOCAL_HOST) -e "create database \`$(DBNAME)\`" -p$(LOCAL_PASSWORD)

local-migrate/status:
	$(GOOSE) -env development tatus 

local-migrate/up:
	$(GOOSE) -env development up 

local-migrate/redo:
	$(GOOSE) -env development redo 

local-db/reset:
	docker-compose exec share-pos-db mysql -h $(LOCAL_HOST) -u $(LOCAL_USER) -p$(LOCAL_PASSWORD) -e "DROP DATABASE if exists $(DBNAME); CREATE DATABASE $(DBNAME);"



#production environment
prod-migrate/init:
	mysql -u $(PROD_USER) -h $(PROD_HOST) -e "create database \`$(DBNAME)\`" -p$(PROD_PASSWORD)

prod-migrate/status:
	$(GOOSE)  -env production status 

prod-migrate/up:
	$(GOOSE) -env production up 

prod-migrate/redo:
	$(GOOSE) -env production redo 

prod-db/reset:
	docker-compose exec share-pos-db mysql -h $(PROD_HOST) -u $(PROD_USER) -p$(PROD_PASSWORD) -e "DROP DATABASE if exists $(DBNAME); CREATE DATABASE $(DBNAME);"


mig/up:
	GOOSE_DNS=${GOOSE_DNS} goose -env production up
