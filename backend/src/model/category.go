package model

type Category struct {
	ID          int    `db:"id" json:"id"`
	Title       string `db:"title" json:title"`
	CreatedUser int    `db:"created_user" json:"created_user"`
	RoomID      int    `db:"room_id" json:"room_id"`
}
