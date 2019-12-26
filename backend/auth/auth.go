package auth

import (

	"github.com/daleksprinter/share-post/session"
	"golang.org/x/oauth2"

	"context"

	"net/http"
	"github.com/google/uuid"
	"fmt"

)

var(
	OAuthConfig *oauth2.Config 
)

func LoginHandler(w http.ResponseWriter, r *http.Request){
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

func OAuthCallbackHandler(w http.ResponseWriter, r * http.Request) {
	code := r.FormValue("code")
	tok, err := OAuthConfig.Exchange(context.Background(), code)

	if err != nil {
		fmt.Fprintf(w, "could not get auth token: %v", err)
	}

	
	sess, err := session.Store.New(r, session.SessionName)
	if err != nil {
		fmt.Fprintf(w, "could not get default session: %v")
	}

	if err != nil {
		fmt.Fprintf(w, "could not fetch profile")
	}

	sess.Values["oauthTokenSessionKey"] = tok.AccessToken
	if err := sess.Save(r, w); err != nil {
		fmt.Fprintf(w, "could not save session")
	}
	http.Redirect(w, r, "http://localhost:8080/", http.StatusFound)
}