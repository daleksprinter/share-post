package auth

import (
	"fmt"
	"github.com/daleksprinter/share-post/model"
	"github.com/daleksprinter/share-post/repository"
	"github.com/daleksprinter/share-post/session"
	"net/http"

	"github.com/jmoiron/sqlx"
)

func GetRequestedUser(db *sqlx.DB, r *http.Request) (model.User, error) {
	email, err := session.GetEmailFromSession(r)

	if err != nil {
		fmt.Println(err)
		return model.User{}, err
	}

	user, err := repository.GetUserByEmail(db, email)

	if err != nil {
		fmt.Println(err)
		return model.User{}, err
	}

	return user, nil
}
