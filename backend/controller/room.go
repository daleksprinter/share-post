package controller

import (
	"net/http"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/daleksprinter/share-post/websocket"

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
	id := vars["room_id"]

	fmt.Println(id)
	room, ok := websocket.Rooms[id];
	if !ok {
		room = *websocket.NewRoom(id)
		websocket.Rooms[id] = room
	}

	client := websocket.NewClient(&room, w, r)
	go client.Read()
	go client.Write()

}
