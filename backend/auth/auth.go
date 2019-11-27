package auth

import (

	"os"
	"../session"
	"../config"
	"golang.org/x/oauth2"

	"net/http"
	"github.com/satori/go.uuid"
	"fmt"

)

func LoginHandler(w http.ResponseWriter, r *http.Request){
	sessionID := uuid.Must(uuid.NewV4()).String()
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

	OAuthConfig := config.ConfigureOAuthClient(os.Getenv("GOOGLE_CLIENT_ID"),os.Getenv("GOOGLE_CLIENT_SECRET"))

	url := OAuthConfig.AuthCodeURL(sessionID, oauth2.ApprovalForce,
		oauth2.AccessTypeOnline)
	
	http.Redirect(w, r, url, http.StatusFound)

}