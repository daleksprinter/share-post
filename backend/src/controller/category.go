package controller

import (
	"encoding/json"
	"net/http"

	"fmt"
	"github.com/daleksprinter/share-post/repository"
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
	roomname := vars["roomname"]

	room, err := repository.GetRoomByName(c.db, roomname)
	if err != nil{
		fmt.Println("could not get room", err)
	}

	cards, _ := repository.GetCategoriesByRoomID(c.db, room.ID)

	res, _ := json.Marshal(cards)

	w.Header().Set("Content-Type", "application/json")
	w.Write(res)

}
