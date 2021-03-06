package websocket

import (
	"github.com/daleksprinter/share-post/model"
)

type Room struct {
	Name       string
	Forward    chan *model.RespCard
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
}

var Rooms = make(map[string]Room)

func NewRoom(name string) *Room {
	return &Room{
		Name:       name,
		Forward:    make(chan *model.RespCard),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
	}
}

func (r *Room) Run() {
	for {
		select {
		case client := <-r.Register:
			r.Clients[client] = true
		case client := <-r.Unregister:
			if _, ok := r.Clients[client]; ok {
				delete(r.Clients, client)
			}

		case message := <-r.Forward:
			for client := range r.Clients {
				client.Send <- message
			}
		}
	}

}
