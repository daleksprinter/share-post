package s3

import (
	//	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"mime/multipart"
	"os"
)

type S3 struct {
	Uploader   *s3manager.Uploader
	BucketName string
}

func NewS3() *S3 {
	access_key := os.Getenv("AWS_ACCESS_KEY_ID")
	sec_key := os.Getenv("AWS_SECRET_KEY_ID")
	sess := session.Must(session.NewSession(&aws.Config{
		Credentials: credentials.NewStaticCredentials(access_key, sec_key, ""),
		Region:      aws.String("ap-northeast-1"),
	}))
	return &S3{
		Uploader:   s3manager.NewUploader(sess),
		BucketName: "share-pos",
	}
}
func (s S3) UploadFile(file multipart.File, filename string, ext string) error {

	_, err := s.Uploader.Upload(&s3manager.UploadInput{
		ACL:         aws.String("public-read"),
		Body:        file,
		Bucket:      aws.String(s.BucketName),
		ContentType: aws.String(ext),
		Key:         aws.String("/profile/" + filename),
	})

	if err != nil {
		return err
	}

	return nil
}
