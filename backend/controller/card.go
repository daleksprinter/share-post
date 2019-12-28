package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/daleksprinter/share-post/model"
	"github.com/daleksprinter/share-post/repository"

	"github.com/daleksprinter/share-post/websocket"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type Card struct {
	db *sqlx.DB
}

func NewCard(db *sqlx.DB) *Card {
	return &Card{
		db: db,
	}
}

func (c *Card) GetCardByRoomIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomname := vars["roomname"]

	room, _ := repository.GetRoomByName(c.db, roomname)

	cards, _ := repository.GetCardByRoomID(c.db, room.ID)

	res, _ := json.Marshal(cards)

	w.Header().Set("Content-Type", "application/json")
	w.Write(res)

}


func (c *Card) PostCardByRoomIDAndCategorHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomname := vars["room_id"]
	category := vars["category_id"]

	room, _ := repository.GetRoomByName(c.db, roomname)
	categoryID, _ := strconv.Atoi(category)

	user, err := repository.GetUserFromSession(c.db, r)
	if err != nil {
		fmt.Println("could not auth user. please login", err)
	}

	var ca model.Card
	json.NewDecoder(r.Body).Decode(&ca)
	ca.ColorCode = "FFFFFF"
	ca.RoomID = room.ID
	ca.CategoryID = categoryID
	ca.CreatedUser = user.ID

	fmt.Println(ca)
	err = repository.PostCardByRoomIDAndCategory(c.db, ca)
	if err != nil {
		fmt.Println(err)
		return
	}

	websocket.Rooms[roomname].Forward <- &websocket.Message{
		Msg: ca.Content,
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "suc")

}
