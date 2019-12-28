package controller

import(
	"net/http"
	"github.com/daleksprinter/share-post/auth"
	"fmt"


)


func IsLoggedIn(w http.ResponseWriter, r *http.Request) {
	user, _ := auth.GetUserFromSession(r)

	fmt.Fprintf(w, user)
}