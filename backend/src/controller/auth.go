package controller

import (
	"encoding/json"
	"fmt"
	"github.com/daleksprinter/share-post/auth"
	"github.com/jmoiron/sqlx"
	"net/http"
)

type Auth struct {
	db *sqlx.DB
}

func NewAuth(db *sqlx.DB) *Auth {
	return &Auth{
		db: db,
	}
}

func (a *Auth) Authenticate(w http.ResponseWriter, r *http.Request) {
	user, err := auth.GetRequestedUser(a.db, r)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, _ := json.Marshal(&user)
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)

}
