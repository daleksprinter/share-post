import React, {Component} from 'react';
import Category from '../containers/Category'
import InputTxt from '../containers/InputTxt'
import { SvgIcon } from '@material-ui/core';

class Room extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){

        const ws = new WebSocket(`ws://127.0.0.1:8080/ws/1`);
        ws.addEventListener('message', function(e){
            console.log(e.data)
        })


        //get categories
        const category_url = `http://localhost:8080/rooms/1/categories`
        fetch(category_url).then(res => {
            return res.json()
        }).then(json => {
            for(const category of json) this.props.addCategory(category)
        })

        console.log(this.props)

        //get cards
        const cards_url = `http://localhost:8080/rooms/1/cards`
        fetch(cards_url).then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
            for(const card of json) this.props.addCard(card)
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
                                <Category data = {category} />
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
