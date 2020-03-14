package auth

import (
	"fmt"
	"net/http"

	"github.com/daleksprinter/share-post/model"
	"github.com/daleksprinter/share-post/repository"
	"github.com/daleksprinter/share-post/session"

	"github.com/jmoiron/sqlx"
)

func GetRequestedUser(db *sqlx.DB, r *http.Request) (model.User, error) {
	email, err := session.GetEmailFromSession(r)

	fmt.Println(email)
	if err != nil {
		return model.User{}, err
	}

	user, err := repository.GetUserByEmail(db, email)

	if err != nil {
		return model.User{}, err
	}

	return user, nil
}
