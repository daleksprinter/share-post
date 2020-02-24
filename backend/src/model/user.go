package model

type User struct {
	ID       int    `db:"id" json:"id"`
	Email    string `db:"email" json:"email"`
	Icon     string `db:"icon" json"icon"`
	Nickname string `db:"nickname" json:"nickname"`
}
