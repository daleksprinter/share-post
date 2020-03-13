package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/daleksprinter/share-post/db"
	"github.com/daleksprinter/share-post/router"
	"github.com/daleksprinter/share-post/s3"
	"github.com/daleksprinter/share-post/session"
	_ "github.com/go-sql-driver/mysql"
	redisstore "gopkg.in/boj/redistore.v1"

	"github.com/gorilla/mux"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Server struct {
	db     *db.DB
	bucket *s3.S3
	router *mux.Router
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Init() {

	DBName := os.Getenv("DB_NAME")
	DBHost := os.Getenv("DB_HOST")
	DBPort := os.Getenv("DB_PORT")
	DBUser := os.Getenv("DB_USER")
	DBPass := os.Getenv("DB_PASSWORD")

	s.db = db.NewDB(DBName, DBHost, DBPort, DBUser, DBPass)
	s.bucket = s3.NewS3()
	s.router = router.NewRouter(s.db.GetDB(), s.bucket)
}

func (s *Server) Run() {
	fmt.Println("Listening on port 8080")

	srv := &http.Server{
		Handler: s.router,
		Addr:    ":8080",
	}

	log.Fatal(srv.ListenAndServe())
}

func main() {
	var err error
	session.Store, err = redisstore.NewRediStore(10, "tcp", "share-pos-cache:6379", "", []byte("secret-key"))
	defer session.Store.Close()
	fmt.Println(err)

	s := NewServer()
	s.Init()
	defer s.db.Close()
	s.Run()
}
