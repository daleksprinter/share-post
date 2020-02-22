import React, {useState} from 'react';

function NewRoom(props){
	const [room_name_new, set_room_name_new] = useState("")
	const [room_password_new, set_room_password_new] = useState("")
	const [is_private, set_is_private] = useState(false)

	const    handlechangenew = (e) => {
		switch(e.target.id){
			case 'roomname_new':
				set_room_name_new(e.target.value)
				break
			case 'password_new':
				set_room_password_new(e.target.value)
				break
			default :
				break
		}
	}

	const handleclicknew = (e) => {
		const url = `/rooms`
		const data = {
			room_name: room_name_new,
			is_private: is_private,
			hashed_password: (is_private ? room_password_new : "")
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
			props.history.push(`/rooms/${room_name_new}`)
		}).catch(err => {
			console.log(err)
		})
	}


	const handlecheck = (e) => set_is_private(!is_private)

	return(
		<div>
			<div>new room</div>
			<input type = "text" onChange = {handlechangenew} placeholder = 'room name' id = "roomname_new"></input>
			<input type = "checkbox" onChange = {handlecheck} checked = {is_private}></input>
			{is_private ? <input type = 'password' onChange = {handlechangenew} placeholder = 'password' id = "password_new"></input> : <span />}
			<button type = "button" onClick = {handleclicknew}>create</button>
		</div>

	)
}

export default NewRoom
