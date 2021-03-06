import React, {useEffect, useState} from 'react';
import Category from '../containers/Category'
import Inputs from './Inputs' 
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from '../actions/Room';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles({
	r:{
		height: '100%',
	},
	root: {
		width: '70%',
		height: '100%',
		backgroundColor: '#EEEEEE',
		margin: "5px",
		padding: "10px",
		textAlign: 'right',
	},
	button: {
		margin: '5px',
	},
	input: {
	},
	direct: {
		position: "fixed",
		zIndex: '100',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: '70%',
		height: '70%',
		marginLeft:'15%',
	},
	card: {
		margin: 'auto',
		marginTop: '20%',
		minWidth: 275,
		width:"10%",
		height:"250px",
	},
	disp: {
		position: 'relative',
		width: '100%',
		height: '100%',
	}
	
})


function Direct(props){

	const classes = useStyles()
	return (
		<div className = {classes.dirroot}>
			<div className = {classes.direct}>
				<Card className = {classes.card}>
					<CardContent>
						<div>{props.data.created_user_name}</div>
						<div>{props.data.content}</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

function Room(props){
	const dispatch = useDispatch()	
	const categoriesselector = (state) => state.room
	const categories = useSelector(categoriesselector)

	const [category_name, set_category_name] = useState("")

	const classes = useStyles()
	const [display, set_display] = useState(false)
	const [recieved_card, set_recieved_data] = useState({})

	const recieve = (data) => {
		console.log(data)
		set_display(true)
		set_recieved_data(data)
	}


	useEffect(() => {
		let room_id = props.match.params.id
		let ws_url = `ws://${window.location.host}/ws/${room_id}`
		let ws = new WebSocket(ws_url);
		ws.addEventListener('message', function(e){
			let data = JSON.parse(e.data)
			recieve(data)		
			props.addCard(data);
		});

		let category_url = `/api/rooms/${room_id}/categories`

		fetch(category_url).then(res => {
			if(!res.ok){
				throw Error(res.statusText)
			}
			return res.json();
		}).then(json => {
			props.setCategories(json);
		}).catch((e) => {
			console.log(e)
		})

		let cards_url = `/api/rooms/${room_id}/cards`;
		fetch(cards_url).then(res => {
			return res.json();
		}).then(json => {
			props.setCards(json);
		})

	}, [])

	const handleclick = () => {
		let room_id = props.match.params.id
		let category_post_url = `/api/rooms/${room_id}/category`
		fetch(category_post_url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				cat: category_name,
			})
		}).then(res => {
			if(!res.ok){
				throw Error(res.statusText)
			}
			return res.json()
		}).then((json) => {
			dispatch(addCategory(json))		
		}).catch(err => {
			console.log(err)
		})
	}

	const handlechange = (e) => {
		set_category_name(e.target.value)
	}

	const hidedirect = () => {
		set_display(false)
	}
	return(
		<div onClick = {hidedirect}>
			{display && <Direct className = {classes.disp} data = {recieved_card}/> }
			
			<div className = {classes.root}>
				<TextField className = {classes.input} id="outlined-basic" label="Category Name" variant="outlined" onChange = {handlechange}/>
				<IconButton onClick = {handleclick} className = {classes.button}>
					<AddIcon />
				</IconButton>
			</div>

			{props.room.categories.map(category => {
				return (
					<Category data = {category} match = {props.match}/>
				)
			})}
			<Inputs />

		</div>
	)
}


export default Room;


