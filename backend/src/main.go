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
	"github.com/joho/godotenv"
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
	db, err := sqlx.Open("mysql", "root:password@tcp(0.0.0.0)/share_pos")
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return db, nil
}

func NewRouter(db *sqlx.DB) *mux.Router {
	r := mux.NewRouter()

	card := controller.NewCard(db)
	r.HandleFunc("/rooms/{roomname}/cards", card.GetCardsByRoomNameHandler).Methods("GET")
	r.HandleFunc("/rooms/{roomname}/categories/{category_id}/cards", card.PostCardHandler).Methods("POST")

	category := controller.NewCategory(db)
	r.HandleFunc("/rooms/{roomname}/categories", category.GetCategoriesByRoomNameHandler).Methods("GET")
	r.HandleFunc("/rooms/{roomname}/category", category.PostCategoryHandler).Methods("POST")

	room := controller.NewRoom(db)
	r.HandleFunc("/ws/{roomname}", room.ServeWs).Methods("GET")
	r.HandleFunc("/rooms/{roomname}", room.JoinRoomHandler).Methods("POST")
	r.HandleFunc("/rooms", room.CreateRoomHandler).Methods("POST")

	authen := controller.NewAuth(db, config.ConfigureOAuthClient())
	r.HandleFunc("/auth", authen.Authenticate).Methods("GET")
	r.HandleFunc("/login", authen.LoginHandler)
	r.HandleFunc("/oauth2callback", authen.OAuthCallbackHandler)

	bucket := s3.NewS3()
	usr := controller.NewUser(db, bucket)
	r.HandleFunc("/user", usr.UpdateProfileHandler).Methods("PUT")

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

func (s *Server) Run(addr string) {
	log.Printf("Listening on port %s", addr)

	srv := &http.Server{
		Handler: s.router,
		Addr:    addr,
	}

	log.Fatal(srv.ListenAndServe())
}

func main() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	datasource := os.Getenv("DATASOURCE")
	if datasource == "" {
		datasource = ":8080"
	}

	s := NewServer()
	s.Init()
	s.Run(datasource)

	defer s.db.Close()
}
