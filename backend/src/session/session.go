package session

import (
	"fmt"
	"net/http"

	oauthapi "google.golang.org/api/oauth2/v2"
	redisstore "gopkg.in/boj/redistore.v1"
)

var Store *redisstore.RediStore

const SessionName = "sess"
const emailKey = "userinfoemail"

func SaveEmailToSession(w http.ResponseWriter, r *http.Request, data oauthapi.Userinfoplus) error {
	sess, err := Store.New(r, SessionName)
	if err != nil {
		fmt.Println(err)
		return err
	}

	sess.Values[emailKey] = data.Email

	if err := sess.Save(r, w); err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func GetEmailFromSession(r *http.Request) (string, error) {
	sess, err := Store.Get(r, SessionName)

	if err != nil {
		fmt.Println(err)
		return "", err
	}

	email, ok := sess.Values[emailKey].(string)
	if !ok {
		fmt.Println(err)
		return "", err
	}

	return email, nil

}
