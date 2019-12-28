import React, {Component} from 'react';
import { withRouter } from 'react-router';

class Join extends Component{
    constructor(){
        super();
        this.state = {
            room_id: "",
        }
    }

    handlechangenew = (e) => {
        this.setState({
            room_id: e.target.value,
        })
    }

    handleclicknew = (e) => {
        this.props.history.push(`/rooms/${this.state.room_id}`)
    }

    handlechangejoin = (e) => {

    }

    handleclickjoin = (e) => {

    }

    render(){
        return(
            <div>
                <div>this is home page</div>

                <div>new room</div>
                <input type = "text" onChange = {this.handlechangnew} placeholder = 'room name'></input>
                <input type = 'password' onChange = {this.handlechangenew} placeholder = 'password'></input>
                <button type = "button" onClick = {this.handleclicknew}>create</button>

                <div>join room</div>
                <input type = "text" onChange = {this.handlechangejoin} placeholder = 'room name'></input>
                <input type = 'password' onChange = {this.handlechangejoin} placeholder = 'password'></input>
                <button type = "button" onClick = {this.handleclickjoin}>join</button>
            </div>
        )
    }
}

export default withRouter(Join);