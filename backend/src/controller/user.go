package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/daleksprinter/share-post/auth"
	"github.com/daleksprinter/share-post/repository"
	"github.com/daleksprinter/share-post/s3"
	"github.com/daleksprinter/share-post/util"
	"github.com/jmoiron/sqlx"
	"net/http"
)

type User struct {
	db     *sqlx.DB
	bucket *s3.S3
}

func NewUser(db *sqlx.DB, bucket *s3.S3) *User {
	return &User{
		db:     db,
		bucket: bucket,
	}
}

func (u *User) UpdateProfileHandler(w http.ResponseWriter, r *http.Request) {

	file, fheader, ferr := r.FormFile("image")
	defer file.Close()
	if ferr != nil {
		fmt.Println(ferr)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	username := r.FormValue("username")

	filename, err := util.GenerateUUID()
	if err != nil {
		fmt.Println(ferr)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ext, err := util.GetFileExtension(fheader.Filename)
	if err != nil {
		fmt.Println(ferr)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = u.bucket.UploadFile(file, filename, ext)
	if err != nil {
		fmt.Println(ferr)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	usr, err := auth.GetRequestedUser(u.db, r)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	usr.Nickname = username
	usr.Icon = sql.NullString{
		String: filename,
		Valid:  true,
	}
	fmt.Println(usr)
	err = repository.UpdateUser(u.db, usr)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)

}

func (u *User) GetUserHandler(w http.ResponseWriter, r *http.Request) {
	usr, err := auth.GetRequestedUser(u.db, r)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(&usr)
}
