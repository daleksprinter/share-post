import React, {Component} from 'react';
import Category from '../containers/Category'
import Inputs from './Inputs' 

class Room extends Component{

    componentDidMount(){
        const {params} = this.props.match
        const room_id = params.id
        const p = this.props
	const ws_url = `ws://${process.env.REACT_APP_BACKEND_HOST}/ws/${room_id}`
        const ws = new WebSocket(ws_url);
        ws.addEventListener('message', function(e){
            const data = JSON.parse(e.data)
            p.addCard(data)
        })

	    ws.onopen = (e) => {
		console.log("new connection")
	    }

        //get categories
        const category_url = `/rooms/${room_id}/categories`
        fetch(category_url).then(res => {
            return res.json()
        }).then(json => {
		this.props.setCategories(json)
        })


        //get cards
        const cards_url = `/rooms/${room_id}/cards`
        fetch(cards_url).then(res => {
            return res.json()
        }).then(json => {
		this.props.setCards(json)
        })
    }
    render(){
        return(
            <div>
                <div>
                    {this.props.room.categories.map(category => {
                        return (
                            <div>
                                <Category data = {category} match = {this.props.match}/>
                            </div>
                        )
                    })}
                </div>
		<Inputs />

            </div>
        )
    }
}

export default Room;


