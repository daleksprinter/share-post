package websocket

import (
	"log"
	"net/http"
	"github.com/daleksprinter/share-post/model"	
	"fmt"

	"github.com/gorilla/websocket"
)

type Client struct {
	Room *Room
	Conn *websocket.Conn
	Send chan *model.Card
}

var Clients = make(map[string]Client)
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func NewClient(room *Room, w http.ResponseWriter, r *http.Request) Client {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return Client{}
	}

	client := &Client{Room: room, Conn: conn, Send: make(chan *model.Card)}
	client.Room.Register <- client

	if err != nil {
		fmt.Fprintf(w, "could not get user")
		return Client{}
	}

	return *client
}

func (c *Client) Write() {
	defer func() {
		c.Conn.Close()
	}()

	for {
		select {
		case message := <-c.Send:
			if err := c.Conn.WriteJSON(message); err != nil {
				break
			}
		}
	}
}
