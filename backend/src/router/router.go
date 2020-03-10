package router

import (
	"github.com/daleksprinter/share-post/config"
	"github.com/daleksprinter/share-post/controller"
	"github.com/daleksprinter/share-post/s3"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

func NewRouter(db *sqlx.DB, bucket *s3.S3) *mux.Router {
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

	usr := controller.NewUser(db, bucket)
	r.HandleFunc("/api/user", usr.UpdateProfileHandler).Methods("PUT")
	r.HandleFunc("/api/usr", usr.GetUserHandler).Methods("GET")

	return r
}
