import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import ItemCard from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
const useStyles = makeStyles({
	card: {
		minWidth: 275,
		margin:"4px",
		width:"30%",
		height:"300px",
		display:"inline-block",
		textAlign: "center",
	},
});


function NewRoom(props){

	const classes = useStyles();

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
		<ItemCard className={classes.card}>
			<Typography variant = "body2">新規ルーム作成</Typography>
			<div>
				<TextField type = "text" onChange = {handlechangenew} placeholder = 'Room ID' id = "roomname_new" variant="outlined" ></TextField>
			</div>
			<div>
				<span variant = "body2">パスワードを設定</span>
				<Checkbox color = "primary" inputProps={{ 'aria-label': 'secondary checkbox'  }} onChange={handlecheck}/>
			</div>
			<div>
				{is_private ? <TextField type = 'password' onChange = {handlechangenew} placeholder = 'Password' id = "password_new" variant="outlined"></TextField> : <span />}
			</div>
			<Button type = "button" onClick = {handleclicknew} variant="contained" color="primary">create</Button>
		</ItemCard>

	)
}

export default NewRoom
