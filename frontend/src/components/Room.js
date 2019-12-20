import React, {Component} from 'react';
import Category from '../containers/Category'

class Room extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        //get categories
        const category_url = `http://localhost:8080/rooms/1/categories`
        fetch(category_url).then(res => {
            return res.json()
        }).then(json => {
            for(const category of json) this.props.addCategory(category)
        })


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
        console.log('clicked')
    }

    render(){
        return(
            <div>
                <div>
                    {this.props.room.categories.map(category => {
                        return <Category data = {category} />
                    })}
                </div>
                <div>
                    <button onClick = {this.handleClick}>add_card</button>
                </div>
            </div>
        )
    }
}

export default Room;
