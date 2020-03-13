package db

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

type DB struct {
	db *sqlx.DB
}

func NewDB(dbname, dbhost, dbport, dbuser, dbpass string) *DB {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbuser, dbpass, dbhost, dbport, dbname)
	fmt.Println(dsn)
	db, err := sqlx.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	return &DB{
		db: db,
	}
}

func (db *DB) GetDB() *sqlx.DB {
	return db.db
}

func (db *DB) Close() {
	db.db.Close()
}
