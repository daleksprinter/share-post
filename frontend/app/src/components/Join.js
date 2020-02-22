import React, {Component} from 'react';
import { withRouter } from 'react-router';
import JoinRoom from './JoinRoom'
class Join extends Component{
    constructor(){
        super();
        this.state = {
            room_id_new: "",
            password_new: "",
            isprivate: true,

        }
    }

    handlechangenew = (e) => {
        switch(e.target.id){
            case 'roomname_new':
                this.setState({
                    room_id_new: e.target.value,
                })
                break
            case 'password_new':
                this.setState({
                    password_new: e.target.value,
                })
                break
	    default :
		break
        }
    }

    handleclicknew = (e) => {
        const url = `/rooms`
        const data = {
            room_name: this.state.room_id_new,
            is_private: this.state.isprivate,
            hashed_password: (this.state.isprivate ? this.state.password_new : "")
        }
        fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => {
		if (!res.ok){
			 throw Error(res.statusText);
		}
		return res.text()
        }).then(txt => {
            this.props.history.push(`/rooms/${this.state.room_id_new}`)
	}).catch(err => {
		console.log(err)
	})
    }


    handlecheck = (e) => {
        this.setState({
            isprivate: !this.state.isprivate
        })
    }

    

    render(){
	console.log(this.props)
        return(
            <div>
                <div>this is home page</div>

                <div>new room</div>
                <input type = "text" onChange = {this.handlechangenew} placeholder = 'room name' id = "roomname_new"></input>
                <input type = "checkbox" onChange = {this.handlecheck} checked = {this.state.isprivate}></input>
                {this.state.isprivate ? <input type = 'password' onChange = {this.handlechangenew} placeholder = 'password' id = "password_new"></input> : <span />}
                <button type = "button" onClick = {this.handleclicknew}>create</button>

		<JoinRoom history={this.props.history}/>
	    </div>
       )
    }
}

export default withRouter(Join);
