package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/daleksprinter/share-post/auth"
	"github.com/daleksprinter/share-post/model"
	"github.com/daleksprinter/share-post/repository"
	"github.com/daleksprinter/share-post/session"
	"github.com/jmoiron/sqlx"

	"context"

	"golang.org/x/oauth2"

	oauthapi "google.golang.org/api/oauth2/v2"
)

type Auth struct {
	db          *sqlx.DB
	OAuthConfig *oauth2.Config
}

func NewAuth(db *sqlx.DB, oauthconf *oauth2.Config) *Auth {
	return &Auth{
		db:          db,
		OAuthConfig: oauthconf,
	}
}

func (a *Auth) Authenticate(w http.ResponseWriter, r *http.Request) {
	user, err := auth.GetRequestedUser(a.db, r)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	res, _ := json.Marshal(&user)
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)

}

func (a *Auth) LoginHandler(w http.ResponseWriter, r *http.Request) {

	oauthFlowSession, err := session.Store.New(r, session.SessionName)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	oauthFlowSession.Options.MaxAge = 10 * 60
	redirectURL := r.FormValue("redirect")
	oauthFlowSession.Values["oauthFlowRedirectKey"] = redirectURL

	if err := oauthFlowSession.Save(r, w); err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	url := a.OAuthConfig.AuthCodeURL(session.SessionName, oauth2.ApprovalForce,
		oauth2.AccessTypeOnline)

	http.Redirect(w, r, url, http.StatusFound)

}

func (a *Auth) OAuthCallbackHandler(w http.ResponseWriter, r *http.Request) {

	fmt.Println("oauth callback handler requested")
	code := r.FormValue("code")
	tok, err := a.OAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	sess, err := session.Store.New(r, session.SessionName)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	sess.Values["oauthTokenSessionKey"] = tok.AccessToken
	if err := sess.Save(r, w); err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	client := a.OAuthConfig.Client(context.Background(), tok)
	svr, err := oauthapi.New(client)
	ui, err := svr.Userinfo.Get().Do()

	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	usr := model.User{
		Email:    ui.Email,
		Nickname: ui.Email,
	}
	err = repository.AddUser(a.db, usr)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = session.SaveEmailToSession(w, r, *ui)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	front := os.Getenv("FRONTEND_URL")
	fmt.Println(front)
	http.Redirect(w, r, fmt.Sprintf("http://%s", front), http.StatusFound)
}

func (a *Auth) LogoutHandler(w http.ResponseWriter, r *http.Request) {
	err := session.DelEmailFromSession(w, r)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
