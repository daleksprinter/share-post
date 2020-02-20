package auth

import (
	"github.com/daleksprinter/share-post/session"
	"golang.org/x/oauth2"

	"context"

	"fmt"
	"net/http"

	"github.com/google/uuid"
	//	"google.golang.org/api/plus/v1"
	oauthapi "google.golang.org/api/oauth2/v2"
)

var (
	OAuthConfig *oauth2.Config
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	sessionID := uuid.Must(uuid.NewRandom()).String()
	oauthFlowSession, err := session.Store.New(r, sessionID)
	if err != nil {
		fmt.Fprintf(w, "could not create oauth session :%v", err)
	}

	oauthFlowSession.Options.MaxAge = 10 * 60

	redirectURL := r.FormValue("redirect")

	oauthFlowSession.Values["oauthFlowRedirectKey"] = redirectURL

	if err := oauthFlowSession.Save(r, w); err != nil {
		fmt.Fprintf(w, "could not save session :%v", err)
	}

	url := OAuthConfig.AuthCodeURL(sessionID, oauth2.ApprovalForce,
		oauth2.AccessTypeOnline)

	http.Redirect(w, r, url, http.StatusFound)

}

func OAuthCallbackHandler(w http.ResponseWriter, r *http.Request) {
	code := r.FormValue("code")
	tok, err := OAuthConfig.Exchange(context.Background(), code)

	if err != nil {
		fmt.Fprintf(w, "could not get auth token: %v", err)
	}

	sess, err := session.Store.New(r, session.SessionName)
	if err != nil {
		fmt.Fprintf(w, "could not get default session: %v")
	}

	sess.Values["oauthTokenSessionKey"] = tok.AccessToken
	if err := sess.Save(r, w); err != nil {
		fmt.Fprintf(w, "could not save session")
	}

	client := OAuthConfig.Client(context.Background(), tok)
	svr, err := oauthapi.New(client)
	ui, err := svr.Userinfo.Get().Do()
	fmt.Println(ui)
	if err != nil {
		fmt.Println("err:", err)
	} else {
		fmt.Println(ui.Email)
		SaveUserToSession(w, r, *ui)
	}

	http.Redirect(w, r, "http://localhost:3000/", http.StatusFound)
}

func SaveUserToSession(w http.ResponseWriter, r *http.Request, data oauthapi.Userinfoplus) error {
	sess, err := session.Store.New(r, session.SessionName)
	if err != nil {
		fmt.Println("could not get session")
		return err
	}
	sess.Values["userinfoemail"] = data.Email
	if err := sess.Save(r, w); err != nil {
		fmt.Println("could not save session")
		return err
	}
	fmt.Println(sess.Values["userinfoemail"])

	return nil
}

func GetUserFromSession(r *http.Request) (string, error) {
	sess, err := session.Store.Get(r, session.SessionName)

	if err != nil {
		fmt.Println("could not get session")
		return "", err
	}

	user, ok := sess.Values["userinfoemail"].(string)
	if !ok {
		fmt.Println("could not get user data from session")
		return "", err
	}

	return user, nil

}
