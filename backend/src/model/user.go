package model

import (
	"database/sql"
)

type User struct {
	ID       int            `db:"id" json:"id"`
	Email    string         `db:"email" json:"email"`
	Icon     sql.NullString `db:"icon" json"icon"`
	Nickname string         `db:"nickname" json:"nickname"`
}
