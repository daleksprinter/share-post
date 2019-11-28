package controller

import (
	"encoding/json"
	"net/http"

	"strconv"

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
