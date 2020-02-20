package controller

import (
	"fmt"
	"github.com/daleksprinter/share-post/model"
	"github.com/daleksprinter/share-post/repository"
	"github.com/daleksprinter/share-post/websocket"
	"github.com/gorilla/mux"
	"net/http"

	"encoding/json"
	"github.com/jmoiron/sqlx"
)

type RoomController struct {
	db *sqlx.DB
}

func NewRoom(db *sqlx.DB) *RoomController {
	return &RoomController{
		db: db,
	}
}

func (rc *RoomController) ServeWs(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomname := vars["roomname"]
	room, ok := websocket.Rooms[roomname]
	if !ok {
		room = *websocket.NewRoom(roomname)
		websocket.Rooms[roomname] = room
		go room.Run()
	}

	client := websocket.NewClient(&room, w, r)
	go client.Write()

}

func (rc *RoomController) CreateRoomHandler(w http.ResponseWriter, r *http.Request) {
	var room model.Room
	json.NewDecoder(r.Body).Decode(&room)

	user, err := repository.GetUserFromSession(rc.db, r)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	room.CreatedUser = user.ID

	err = repository.CreateRoom(rc.db, room)

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func (rc *RoomController) JoinRoomHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomname := vars["roomname"]

	p := struct {
		Password string `json: "hashed_password"`
	}{}
	json.NewDecoder(r.Body).Decode(&p)

	room, err := repository.GetRoomByName(rc.db, roomname)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if room.HashedPassword != p.Password {
		fmt.Println("password not match")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)

}
