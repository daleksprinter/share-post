package repository

import (
	"github.com/daleksprinter/share-post/model"
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

func PostCard(db *sqlx.DB, card model.Card) error {

	query := "insert into post(content, color_code, room_id, category_id, created_user) values(?, ?, ?, ?, ?)"
	_, err := db.Query(query, card.Content, card.ColorCode, card.RoomID, card.CategoryID, card.CreatedUser)
	if err != nil {
		return err
	}
	return nil
}
