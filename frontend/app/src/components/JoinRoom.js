import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import ItemCard from '@material-ui/core/Card';

const useStyles = makeStyles({
	card: {
		minWidth: 275,
		margin:"4px",
		width:"7%",
		height:"200px",
		display:"inline-block",
		textAlign: "center",
	},
});


function JoinRoom(props){

	const classes = useStyles();

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
		<ItemCard className={classes.card}>
			<div>ルームに入る</div>
			<div>
				<input type = "text" onChange = {handlechangejoin} placeholder = 'room name' id = "roomname_join"></input>
			</div>
			<div>
				<input type = 'password' onChange = {handlechangejoin} placeholder = 'password' id = "password_join"></input>
			</div>
			<button type = "button" onClick = {handleclickjoin}>join</button>
		</ItemCard>

	)

}

export default JoinRoom
