import React, {Component} from 'react';

class Category extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const url = `http://localhost:8080/rooms/1/categories/${this.props.data.id}/cards`
        fetch(url).then(res => {
            return res.json()
        }).then(json => {
            console.log(json)
        })
    }


    render(){
        return(
            <div>
                <div>{this.props.data.Title}</div>
            </div>
        )
    }
}

export default Category;
