package model

type Card struct {
	ID          int64  `db:"id" json:"id"`
	Content     string `db:"content" json:"content"`
	ColorCode   string `db:"color_code" json:"color_code"`
	RoomID      int    `db:"room_id" json:"room_id"`
	CategoryID  int    `db:"category_id" json:"category_id"`
	CreatedUser int    `db:"created_user" json:"created_user"`
}

type RespCard struct {
	Content         string `json:"content"`
	CreatedUserName string `json:"created_user_name"`
	ColorCode       string `json:"color_code"`
	CategoryID      int    `json:"category_id"`
}
