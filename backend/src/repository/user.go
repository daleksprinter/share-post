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
