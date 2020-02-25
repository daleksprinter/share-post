package repository

import (
	"github.com/daleksprinter/share-post/model"
	"github.com/daleksprinter/share-post/util"
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

func AddCategory(db *sqlx.DB, c model.Category) (int64, error) {
	cat := util.NamedExecMap(c)
	query := "insert into category(title, created_user, room_id) values(:title, :created_user, :room_id)"
	res, err := db.NamedExec(query, cat)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return id, nil
}
