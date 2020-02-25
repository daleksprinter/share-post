package controller

import (
	"encoding/json"
	"net/http"

	"fmt"
	"github.com/daleksprinter/share-post/auth"
	"github.com/daleksprinter/share-post/model"
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

func (c *Category) GetCategoriesByRoomNameHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomname := vars["roomname"]

	room, err := repository.GetRoomByName(c.db, roomname)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	cards, err := repository.GetCategoriesByRoomID(c.db, room.ID)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, _ := json.Marshal(cards)
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)

}

func (c *Category) PostCategoryHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomName := vars["roomname"]

	p := struct {
		categoryName string `json:"category_name"`
	}{}
	json.NewDecoder(r.Body).Decode(&p)

	usr, err := auth.GetRequestedUser(c.db, r)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	room, err := repository.GetRoomByName(c.db, roomName)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	cat := model.Category{
		Title:       p.categoryName,
		CreatedUser: usr.ID,
		RoomID:      room.ID,
	}

	fmt.Printf("%+v/n", cat)

}
