package controller

import (
	"net/http"
	"fmt"
	"strconv"
	"github.com/gorilla/mux"
	"github.com/daleksprinter/share-post/websocket"
	"github.com/daleksprinter/share-post/model"
	"github.com/daleksprinter/share-post/repository"

	"github.com/jmoiron/sqlx"
	"encoding/json"
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


func (rc *RoomController) IsRoomExist(w http.ResponseWriter, r * http.Request){
	var posted_room model.Room
	
	json.NewDecoder(r.Body).Decode(&posted_room)
	fmt.Println(posted_room)
	room, _ := repository.GetRoomByName(rc.db, posted_room.RoomName)

	fmt.Println(room)

	if room.RoomName != "" && (!room.IsPrivate || posted_room.HashedPassword == room.HashedPassword) {
		fmt.Fprintf(w, strconv.Itoa(room.ID))
	}else {
		fmt.Fprintf(w, "0")
	}
}