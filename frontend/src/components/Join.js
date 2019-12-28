import React, {Component} from 'react';
import { withRouter } from 'react-router';

class Join extends Component{
    constructor(){
        super();
        this.state = {
            room_id_new: "",
            password_new: "",

            room_id_join: "",
            password_join: "",
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
        switch(e.target.id){
            case 'roomname':
                this.setState({
                    room_id_join: e.target.value,
                })
                break
            case 'password':
                this.setState({
                    password_join: e.target.value,
                })
                break
        }
        console.log(this.state)
    }

    handleclickjoin = (e) => {
        const url = "http://localhost:8080/isroomexist";
        fetch(url, {
            method:"POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                room_name: this.state.room_id_join,
                hashed_password: this.state.password_join,
            })
        }).then((res) => {
            return res.text()
        }).then((txt) => {
            if(txt != "0"){
                this.props.history.push(`/rooms/${txt}`)
            }else{
                console.log("room not found")
            }
        })
    }

    render(){
        return(
            <div>
                <div>this is home page</div>

                <div>new room</div>
                <input type = "text" onChange = {this.handlechangnew} placeholder = 'room name' id = "roomname"></input>
                <input type = 'password' onChange = {this.handlechangenew} placeholder = 'password' id = "password"></input>
                <button type = "button" onClick = {this.handleclicknew}>create</button>

                <div>join room</div>
                <input type = "text" onChange = {this.handlechangejoin} placeholder = 'room name' id = "roomname"></input>
                <input type = 'password' onChange = {this.handlechangejoin} placeholder = 'password' id = "password"></input>
                <button type = "button" onClick = {this.handleclickjoin}>join</button>
            </div>
        )
    }
}

export default withRouter(Join);