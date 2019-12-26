package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"encoding/json"
	"github.com/daleksprinter/share-post/model"

	"github.com/daleksprinter/share-post/auth"
	"github.com/daleksprinter/share-post/config"
	"github.com/daleksprinter/share-post/controller"
	"github.com/daleksprinter/share-post/session"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"

	"github.com/gorilla/mux"

	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
)

type Server struct {
	db     *sqlx.DB
	router *mux.Router
}

func NewServer() *Server {
	return &Server{}
}

// func NewDB(datasource string) (*sql.DB, error) {
// 	return sql.Open("mysql", datasource)
// }

func NewDB() (*sqlx.DB, error) {
	db, err := sqlx.Open("mysql", "root:password@tcp/share_pos")
	if err != nil {
		return nil, err
	}
	return db, nil
}

func Index(w http.ResponseWriter, r *http.Request) {

	var card model.Card
	json.NewDecoder(r.Body).Decode(&card)
	fmt.Println(card)

	sess, err := session.Store.Get(r, session.SessionName)
	if err != nil {
		fmt.Fprintf(w, "could not get session")
	}
	tok, ok := sess.Values["oauthTokenSessionKey"].(string)
	if !ok {
		fmt.Fprint(w, "could not get token, please login")
	}

	w.Write([]byte(tok))
}

func NewRouter(db *sqlx.DB) *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/", Index).Methods("POST")
	r.HandleFunc("/login", auth.LoginHandler)
	r.HandleFunc("/oauth2callback", auth.OAuthCallbackHandler)

	card := controller.NewCard(db)
	r.HandleFunc("/rooms/{id}/cards", card.GetCardByRoomIDHandler)
	r.HandleFunc("/rooms/{room_id}/categories/{category_id}/cards", card.GetCardByRoomIDAndCategoryHandler).Methods("GET")
	r.HandleFunc("/rooms/{room_id}/categories/{category_id}/cards", card.PostCardByRoomIDAndCategorHandler).Methods("POST")

	category := controller.NewCategory(db)
	r.HandleFunc("/rooms/{id}/categories", category.GetCategoryByRoomIDHandler)
	return r
}

func (s *Server) Init(datasource string) {
	db, err := NewDB()
	if err != nil {
		log.Fatal("failed to connect DB. %s", err)
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

	defer s.db.Close()
}
