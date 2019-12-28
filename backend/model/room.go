package model

type Room struct {
	ID             int    `db:"id" json:"id"`
	RoomName       string `db:"room_name" json:"room_name"`
	CreatedUser    int    `db:"created_user" json:"created_user"`
	IsPrivate      bool   `db:"is_private" json:"is_private"`
	HashedPassword string `db:"hashed_password" json:"hashed_password"`
}
