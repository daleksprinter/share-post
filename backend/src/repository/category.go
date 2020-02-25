package repository

import (
	"github.com/daleksprinter/share-post/model"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/jmoiron/sqlx"
)

func GetCategoriesByRoomID(db *sqlx.DB, RoomID int) ([]model.Category, error) {
	categories := make([]model.Category, 0)
	if err := db.Select(&categories, `select * from category where room_id = ?`, RoomID); err != nil {
		return nil, err
	}
	return categories, nil
}

func AddCategory(db *sqlx.DB, c model.Category) error {
	query := "insert into category(title, created_user, room_id) values(?, ?, ?)"
	_, err := db.Query(query, c.Title, c.CreatedUser, c.RoomID)
	if err != nil {
		return err
	}
	return nil
}
