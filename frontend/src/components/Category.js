import React, {Component} from 'react';

class Category extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props.data.id)
        const url = `http://localhost:8080/rooms/1/categories/${this.props.data.id}/cards`
        fetch(url).then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
            for(const card of json) this.props.addCard(card)
        })
    }


    render(){
        return(
            <div>
                <div>{this.props.data.Title}</div>
                {this.props.category.cards.map(card => {
                    return (
                        <div>{card.id}</div>
                    )
                })}
            </div>
        )
    }
}

export default Category;
