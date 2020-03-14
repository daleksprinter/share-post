package config

import (
	"fmt"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func ConfigureOAuthClient() *oauth2.Config {
	backendUrl := os.Getenv("BACKEND_HOST")
	if backendUrl == "" {
		backendUrl = "localhost:8080"
	}
	redirectURL := fmt.Sprintf("http://%s/api/oauth2callback", backendUrl)
	fmt.Println(redirectURL)
	return &oauth2.Config{
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  redirectURL,
		Scopes:       []string{"email"},
		Endpoint:     google.Endpoint,
	}
}
