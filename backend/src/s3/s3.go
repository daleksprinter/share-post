package s3

import (
	"github.com/aws/aws-sdk-go/aws/session"
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
