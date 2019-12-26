package websocket

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Client struct {
	Room *Room
	Conn *websocket.Conn
	Send chan *Message
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool{
		return true
	},
}

func NewClient(room *Room, w http.ResponseWriter, r *http.Request) *Client {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return nil
	}

	client := &Client{Room: room, Conn: conn, Send: make(chan *Message)}
	client.Room.Register <- client

	return client
}

func (c *Client) Read() {
	defer func() {
		c.Room.Unregister <- c
		c.Conn.Close()
	}()
	for {
		var message *Message
		if err := c.Conn.ReadJSON(&message); err == nil {
			c.Room.Forward <- message
		} else {
			break
		}
	}
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
