package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"strconv"

	"../model"
	"../repository"
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
	id := vars["id"]

	roomID, _ := strconv.Atoi(id)

	cards, _ := repository.GetCardByRoomID(c.db, roomID)

	res, _ := json.Marshal(cards)

	w.Header().Set("Content-Type", "application/json")
	w.Write(res)

}

func (c *Card) GetCardByRoomIDAndCategoryHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	room := vars["room_id"]
	category := vars["category_id"]

	roomID, _ := strconv.Atoi(room)
	categoryID, _ := strconv.Atoi(category)

	cards, _ := repository.GetCardByRoomIDAndCategory(c.db, roomID, categoryID)

	res, _ := json.Marshal(cards)

	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}

func (c *Card) PostCardByRoomIDAndCategorHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	room := vars["room_id"]
	category := vars["category_id"]

	roomID, _ := strconv.Atoi(room)
	categoryID, _ := strconv.Atoi(category)

	var ca model.Card
	json.NewDecoder(r.Body).Decode(&ca)
	ca.ColorCode = "FFFFFF"
	ca.RoomID = roomID
	ca.CategoryID = categoryID
	ca.CreatedUser = 1

	fmt.Println(ca)
	err := repository.PostCardByRoomIDAndCategory(c.db, ca)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "suc")

}
