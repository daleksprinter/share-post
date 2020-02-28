package s3

import (
	"errors"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"mime/multipart"
	"os"
	"strings"
)

type S3 struct {
	Uploader *s3manager.Uploader
}

func NewS3() *S3 {
	access_key := os.Getenv("AWS_ACCESS_KEY_ID")
	sec_key := os.Getenv("AWS_SECRET_KEY_ID")
	sess := session.Must(session.NewSession(&aws.Config{
		Credentials: credentials.NewStaticCredentials(access_key, sec_key, ""),
		Region:      aws.String("ap-northeast-1"),
	}))
	return &S3{
		Uploader: s3manager.NewUploader(sess),
	}
}

func getFileExtension(filename string) (string, error) {
	if strings.HasSuffix(filename, ".jpeg") {
		return "image/jpeg", nil
	} else if strings.HasSuffix(filename, ".jpg") {
		return "image/jpeg", nil
	} else if strings.HasSuffix(filename, ".png") {
		return "image/png", nil
	} else if strings.HasSuffix(filename, ".gif") {
		return "image/gif", nil
	}

	return "", errors.New("file is not picture, use .jpeg, .jpg, .png or gif data")
}

func (s S3) UploadFile(file multipart.File, filename string) error {

	ext, err := getFileExtension(filename)
	if err != nil {
		return err
	}
	fmt.Println(ext)
	return nil
}
