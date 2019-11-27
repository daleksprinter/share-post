package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"./auth"
	"./config"
	"./session"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gorilla/mux"

	"github.com/joho/godotenv"
)

type Server struct {
	db     *sql.DB
	router *mux.Router
}

func NewServer() *Server {
	return &Server{}
}

func NewDB(datasource string) (*sql.DB, error) {
	return sql.Open("mysql", datasource)
}

func Index(w http.ResponseWriter, r *http.Request) {
	sess, err := session.Store.Get(r, session.SessionName)
	if err != nil {
		fmt.Fprintf(w, "could not get session")
	}
	tok, ok := sess.Values["oauthTokenSessionKey"].(string)
	if !ok {
		fmt.Fprint(w, "could not get token")
	}

	w.Write([]byte(tok))
}

func NewRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/", Index)
	r.HandleFunc("/login", auth.LoginHandler)
	r.HandleFunc("/oauth2callback", auth.OAuthCallbackHandler)
	return r
}

func (s *Server) Init(datasource string) {
	db, err := NewDB(datasource)
	if err != nil {
		log.Fatal("failed to connect DB. %s", err)
	}

	s.db = db

	s.router = NewRouter()
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
	auth.OAuthConfig = config.ConfigureOAuthClient()
	if err != nil {
		log.Fatalf("error loading .env file. %s", err)
	}
	datasource := os.Getenv("DATABASE_DATASOURCE")
	if datasource == "" {
		log.Fatal("Cannot get datasource for database.")
	}

	s := NewServer()
	s.Init("root:password@tcp(0.0.0.0:3306)/share_pos")
	s.Run(datasource)
}
