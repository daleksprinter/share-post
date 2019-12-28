package repository

import(
	"github.com/daleksprinter/share-post/model"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/jmoiron/sqlx"
	"fmt"
)

func GetRoomByName(db *sqlx.DB, rn string) (model.Room, error) {
	fmt.Println("room name is ", rn)
	room := model.Room{}
	if err := db.Get(&room, `select * from room where room_name = ?`, rn); err != nil {
		fmt.Println(err)
		return model.Room{}, err
	}
	fmt.Println("room found", room)
	return room, nil
}