package repository

import (
	"fmt"
	"github.com/daleksprinter/share-post/model"
	"github.com/daleksprinter/share-post/auth"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/jmoiron/sqlx"
	"net/http"
)

func GetUserByEmail(db *sqlx.DB, email string) (model.User, error) {
	user := model.User{}
	if err := db.Get(&user, `select * from user where email = ?`, email); err != nil {
		fmt.Println(err)
		return model.User{}, err
	}
	fmt.Println("user found", user)
	return user, nil
}


func GetUserFromSession(db *sqlx.DB, r *http.Request) (model.User, error){
	email, err := auth.GetUserFromSession(r)
	if err != nil {
		return model.User{}, err
	}
	fmt.Println("username", email)
	user, err := GetUserByEmail(db, email)
	if err != nil {
		return model.User{}, err
	}

	return user, nil
}