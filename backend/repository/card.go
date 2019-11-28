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
