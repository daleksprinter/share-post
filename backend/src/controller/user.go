package controller

import (
	"fmt"
	"github.com/daleksprinter/share-post/s3"
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

	file, _, ferr := r.FormFile("image")
	defer file.Close()
	if ferr != nil {
		fmt.Println(ferr)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	filename := "hogehoge.jpeg"

	u.bucket.UploadFile(file, filename)
}
