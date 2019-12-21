import React, {Component} from 'react';
import Card from './Card'

class Category extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div>{this.props.data.Title}</div>
                {this.props.category.cards.map(card => {
                    return (
                        this.props.data.id == card.category_id ? <Card data = {card} /> : ''
                    )
                })}
            </div>
        )
    }
}

export default Category;
