package utils

import (
	"github.com/daleksprinter/share-post/repository"
)

func isRoomExist(db *sqlx.DB, roomname string) bool {
	_, err := repository.GetRoomByName(db, roomname)
	if err == nil {
		return true
	} else {
		return false
	}
}
