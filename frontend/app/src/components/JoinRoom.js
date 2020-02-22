import React, {useState} from 'react';
import { withRouter } from 'react-router';

function JoinRoom(props){
	const [room_name_join, set_room_name_join] = useState("")
	const [room_password_join, set_room_password_join] = useState("")

	const handlechangejoin = (e) => {
		switch(e.target.id){
			case 'roomname_join':
				set_room_name_join(e.target.value)
				break
			case 'password_join':
				set_room_password_join(e.target.value)
				break
			default :
				break
		}
	}

	const handleclickjoin = (e) => {
		const url = `/rooms/${room_name_join}`;
		fetch(url, {
			method:"POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
				hashed_password: room_password_join
			})
		}).then((res) => {
			if(!res.ok) {
				throw Error(res.statusText);
			}
			return res.text()
		}).then((txt) => {
			props.history.push(`/rooms/${room_name_join}`)
		}).catch(txt => {
			console.log(txt)
		})
	}

	return(
		<div>
			<div>join room</div>
			<input type = "text" onChange = {handlechangejoin} placeholder = 'room name' id = "roomname_join"></input>
			<input type = 'password' onChange = {handlechangejoin} placeholder = 'password' id = "password_join"></input>
			<button type = "button" onClick = {handleclickjoin}>join</button>
		</div>

	)

}

export default JoinRoom
