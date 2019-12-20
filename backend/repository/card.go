package repository

import (
	"../model"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/jmoiron/sqlx"
)

func GetCardByRoomID(db *sqlx.DB, RoomID int) ([]model.Card, error) {
	cards := make([]model.Card, 0)
	if err := db.Select(&cards, `select * from post where room_id = ?`, RoomID); err != nil {
		return nil, err
	}
	return cards, nil
}

func GetCardByRoomIDAndCategory(db *sqlx.DB, RoomID int, CategoryID int) ([]model.Card, error) {
	cards := make([]model.Card, 0)
	if err := db.Select(&cards, `select * from post where room_id = ? and category_id = ?`, RoomID, CategoryID); err != nil {
		return nil, err
	}
	return cards, nil
}

func PostCardByRoomIDAndCategory(db *sqlx.DB, card model.Card) error {

	if _, err := db.Query("insert into post(content, color_code, room_id, category_id, created_user) values(?, ?, ?, ?, ?)", card.Content, card.ColorCode, card.RoomID, card.CategoryID, card.CreatedUser); err != nil {
		return err
	}
	return nil
}
