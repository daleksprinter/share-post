package controller

import (
	"encoding/json"
	"net/http"

	"strconv"

	"../repository"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type Category struct {
	db *sqlx.DB
}

func NewCategory(db *sqlx.DB) *Category {
	return &Category{
		db: db,
	}
}

func (c *Category) GetCategoryByRoomIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	roomID, _ := strconv.Atoi(id)

	cards, _ := repository.GetCategoriesByRoomID(c.db, roomID)

	res, _ := json.Marshal(cards)

	w.Header().Set("Content-Type", "application/json")
	w.Write(res)

}
