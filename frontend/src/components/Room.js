import React, {Component} from 'react';
import Category from '../containers/Category'

class Room extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
        const url = `http://localhost:8080/rooms/1/categories`
        fetch(url).then(res => {
            return res.json()
        }).then(json => {
            for(const category of json) this.props.addCategory(category)
        })
    }


    render(){
        return(
            <div>
                {this.props.room.categories.map(category => {
                    return <Category data = {category} />
                })}
            </div>
        )
    }
}

export default Room;
