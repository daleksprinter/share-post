package controller

import (
	"net/http"
	"fmt"
	"strconv"
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
	roomID, _ := strconv.Atoi(id)
	fmt.Println(id)
	room, ok := websocket.Rooms[roomID];
	if !ok {
		room = *websocket.NewRoom(roomID)
		websocket.Rooms[roomID] = room
		go room.Run()
	}

	client := websocket.NewClient(&room, w, r)
	go client.Write()

}
