package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/daleksprinter/share-post/auth"
	"github.com/daleksprinter/share-post/model"
	"github.com/daleksprinter/share-post/repository"
	"github.com/daleksprinter/share-post/websocket"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type RespCard struct {
	Content         string `json:"content"`
	CreatedUserName string `json:"created_user_name"`
	ColorCode       string `json:"color_code"`
	CategoryID      int    `json:"category_id"`
}

func makeCard(db *sqlx.DB, c model.Card) (RespCard, error) {
	user, err := repository.GetUserByID(db, c.CreatedUser)
	if err != nil {
		fmt.Println(err)
		return RespCard{}, err
	}

	resp := RespCard{
		Content:         c.Content,
		CreatedUserName: user.Nickname,
		ColorCode:       c.ColorCode,
		CategoryID:      c.CategoryID,
	}
	return resp, nil
}

type Card struct {
	db *sqlx.DB
}

func NewCard(db *sqlx.DB) *Card {
	return &Card{
		db: db,
	}
}

func (c *Card) GetCardsByRoomNameHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomname := vars["roomname"]

	room, _ := repository.GetRoomByName(c.db, roomname)

	cards, _ := repository.GetCardByRoomID(c.db, room.ID)

	respCards := []RespCard{}
	for _, card := range cards {
		c, err := makeCard(c.db, card)
		if err != nil {
			fmt.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		respCards = append(respCards, c)
	}

	res, _ := json.Marshal(respCards)

	w.Header().Set("Content-Type", "application/json")
	w.Write(res)

}

func (c *Card) PostCardHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomname := vars["roomname"]
	category := vars["category_id"]

	room, _ := repository.GetRoomByName(c.db, roomname)
	categoryID, _ := strconv.Atoi(category)

	user, err := auth.GetRequestedUser(c.db, r)
	if err != nil {
		fmt.Println(err)
		return
	}

	ca := model.Card{
		ColorCode:   "FFFFFF",
		RoomID:      room.ID,
		CategoryID:  categoryID,
		CreatedUser: user.ID,
	}
	json.NewDecoder(r.Body).Decode(&ca)

	err = repository.PostCard(c.db, ca)
	if err != nil {
		fmt.Println(err)
		return
	}

	websocket.Rooms[roomname].Forward <- &ca

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "suc")

}
