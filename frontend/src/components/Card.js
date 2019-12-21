import React, {Component} from 'react';

class Card extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div>{this.props.data.id} {this.props.data.content}</div>
            </div>
        )
    }
}

export default Card;
