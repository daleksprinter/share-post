package websocket

import (
	"github.com/gorilla/websocket"
)

type Client struct {
	Room *Room
	Conn *websocket.Conn
	Send chan *Message
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
