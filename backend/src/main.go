package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/daleksprinter/share-post/config"
	"github.com/daleksprinter/share-post/controller"
	"github.com/daleksprinter/share-post/s3"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"

	"github.com/gorilla/mux"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type Server struct {
	db     *sqlx.DB
	bucket s3.S3
	router *mux.Router
}

func NewServer() *Server {
	return &Server{}
}

func NewDB() (*sqlx.DB, error) {
	DBName := os.Getenv("DB_NAME")
	DBHost := os.Getenv("DB_HOST")
	DBPort := os.Getenv("DB_PORT")
	DBUser := os.Getenv("DB_USER")
	DBPass := os.Getenv("DB_PASSWORD")
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", DBUser, DBPass, DBHost, DBPort, DBName)
	fmt.Println(dsn)
	db, err := sqlx.Open("mysql", dsn)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return db, nil
}

func NewRouter(db *sqlx.DB) *mux.Router {
	r := mux.NewRouter()

	card := controller.NewCard(db)
	r.HandleFunc("/api/rooms/{roomname}/cards", card.GetCardsByRoomNameHandler).Methods("GET")
	r.HandleFunc("/api/rooms/{roomname}/categories/{category_id}/cards", card.PostCardHandler).Methods("POST")

	category := controller.NewCategory(db)
	r.HandleFunc("/api/rooms/{roomname}/categories", category.GetCategoriesByRoomNameHandler).Methods("GET")
	r.HandleFunc("/api/rooms/{roomname}/category", category.PostCategoryHandler).Methods("POST")

	room := controller.NewRoom(db)
	r.HandleFunc("/ws/{roomname}", room.ServeWs)
	r.HandleFunc("/api/rooms/{roomname}", room.JoinRoomHandler).Methods("POST")
	r.HandleFunc("/api/rooms", room.CreateRoomHandler).Methods("POST")

	authen := controller.NewAuth(db, config.ConfigureOAuthClient())
	r.HandleFunc("/api/auth", authen.Authenticate).Methods("GET")
	r.HandleFunc("/api/login", authen.LoginHandler)
	r.HandleFunc("/api/oauth2callback", authen.OAuthCallbackHandler)

	bucket := s3.NewS3()
	usr := controller.NewUser(db, bucket)
	r.HandleFunc("/api/user", usr.UpdateProfileHandler).Methods("PUT")
	r.HandleFunc("/api/usr", usr.GetUserHandler).Methods("GET")

	return r
}

func (s *Server) Init() {
	db, err := NewDB()
	if err != nil {
		panic(err)
	}

	s.db = db
	s.router = NewRouter(db)
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

	s := NewServer()
	s.Init()
	s.Run()

	defer s.db.Close()
}
