package repository

import(
	"github.com/daleksprinter/share-post/model"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/jmoiron/sqlx"
	"fmt"
)

func GetRoomByName(db *sqlx.DB, rn string) (model.Room, error) {
	room := model.Room{}
	if err := db.Get(&room, `select * from room where room_name = ?`, rn); err != nil {
		fmt.Println(err)
		return model.Room{}, err
	}
	fmt.Println("room found", room)
	return room, nil
}

func CreateRoom(db *sqlx.DB, r model.Room) error {

	if _, err := db.Query("insert into room(room_name, created_user, is_private, hashed_password) values(?, ?, ?, ?)", r.RoomName, r.CreatedUser, r.IsPrivate, r.HashedPassword); err != nil {
		return err
	}
	return nil

}