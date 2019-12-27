import React, {Component} from 'react';
import { withRouter } from 'react-router';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            room_id: "",
        }
    }

    handlechange = (e) => {
        this.setState({
            room_id: e.target.value,
        })
    }

    handleclick = (e) => {
        this.props.history.push(`/rooms/${this.state.room_id}`)
    }

    render(){
        return(
            <div>
                <div>this is home page</div>
                <input type = "text" onChange = {this.handlechange}></input>
                <button type = "button" onClick = {this.handleclick}>enter</button>
            </div>
        )
    }
}

export default withRouter(Home);