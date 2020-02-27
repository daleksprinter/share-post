import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import ItemCard from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
	card: {
		margin:"4px",
		width:theme.spacing(40),
		height:"300px",
		display:"inline-block",
		textAlign: "center",
	},
}));


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
			<Typography variant="body2" >ルームに入る</Typography>
			<div>
				<TextField type = "text" onChange = {handlechangejoin} placeholder = 'Room ID' id = "roomname_join" variant="outlined"></TextField>
			</div>
			<div>
				<TextField type = 'password' onChange = {handlechangejoin} placeholder = 'Password' id = "password_join" variant="outlined"></TextField>
			</div>
			<Button type = "button" onClick = {handleclickjoin} variant="contained" color="primary">join</Button>
		</ItemCard>

	)

}

export default JoinRoom
