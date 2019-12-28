package controller

import (
	"net/http"
	"fmt"
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
	roomname := vars["roomname"]
	room, ok := websocket.Rooms[roomname];
	if !ok {
		room = *websocket.NewRoom(roomname)
		websocket.Rooms[roomname] = room
		go room.Run()
	}

	client := websocket.NewClient(&room, w, r)
	go client.Write()

}


func (rc *RoomController) IsRoomExist(w http.ResponseWriter, r * http.Request){
	var posted_room model.Room
	
	json.NewDecoder(r.Body).Decode(&posted_room)
	room, _ := repository.GetRoomByName(rc.db, posted_room.RoomName)

	if room.RoomName != "" && (!room.IsPrivate || posted_room.HashedPassword == room.HashedPassword) {
		fmt.Fprintf(w, room.RoomName)
	}else {
		fmt.Fprintf(w, "")
	}
}

func(rc *RoomController) CreateRoomHandler(w http.ResponseWriter, r *http.Request){
	var room model.Room

	json.NewDecoder(r.Body).Decode(&room)

	user, err := repository.GetUserFromSession(rc.db, r)
	if err != nil {
		fmt.Println("could not get user from request", err)
	}

	room.CreatedUser = user.ID

	err = repository.CreateRoom(rc.db, room)

	if err != nil {
		fmt.Println("can't insert room to db", err)
	}

	fmt.Fprintf(w, room.RoomName)

}