import React, {Component} from 'react';
import Category from '../containers/Category'
import InputTxt from '../containers/InputTxt'


class Room extends Component{

    componentDidMount(){
        const {params} = this.props.match
        const room_id = params.id
        const p = this.props

        const ws = new WebSocket(`ws://${process.env.REACT_APP_BACKEND_HOST}/ws/${room_id}`);
        ws.addEventListener('message', function(e){
            const data = JSON.parse(e.data)
            data.id = "New"
            p.addCard(data)
        })


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

    handleClick = () => {
        this.props.addInput()
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
                <div>
                    {this.props.inputs.inputs.map((txt, ind) => {
                        return (
                            <InputTxt id = {ind} txt = {txt}></InputTxt>
                        )
                    })}
                </div>
                <button onClick = {this.handleClick}>add_card</button>

            </div>
        )
    }
}

export default Room;


