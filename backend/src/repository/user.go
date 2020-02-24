package repository

import (
	"fmt"
	"github.com/daleksprinter/share-post/model"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/jmoiron/sqlx"
)

func GetUserByEmail(db *sqlx.DB, email string) (model.User, error) {
	user := model.User{}
	query := `select * from user where email = ?`
	err := db.Get(&user, query, email)
	if err != nil {
		fmt.Println(err)
		return user, err
	}

	return user, nil
}

func GetUserByID(db *sqlx.DB, id int) (model.User, error) {
	user := model.User{}
	query := `select * from user where id = ?`
	err := db.Get(&user, query, id)
	if err != nil {
		fmt.Println(err)
		return user, err
	}
	return user, nil
}

func AddUser(db *sqlx.DB, u model.User) error {
	query := "insert into user (email, nickname) values(?, ?)"
	_, err := db.Query(query, u.Email, u.Nickname)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}
