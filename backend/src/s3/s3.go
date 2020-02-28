package s3

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws/session"
	"mime/multipart"
)

type S3 struct {
	sess *session.Session
}

func NewS3() *S3 {
	s := S3{
		sess: session.Must(session.NewSession()),
	}
	return &s
}

func (s S3) UploadFile(file multipart.File, filename string) error {
	fmt.Println(file, filename)
	return nil
}
