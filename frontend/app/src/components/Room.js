import React, {useEffect} from 'react';
import Category from '../containers/Category'
import Inputs from './Inputs' 
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
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
	}
})



function Room(props){
	
	const classes = useStyles()
	useEffect(() => {
		let room_id = props.match.params.id
		let ws_url = `ws://${process.env.REACT_APP_BACKEND_HOST}/ws/${room_id}`
		let ws = new WebSocket(ws_url);
		ws.addEventListener('message', function(e){
			let data = JSON.parse(e.data)
			props.addCard(data);
		});

		let category_url = `/rooms/${room_id}/categories`

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

		let cards_url = `/rooms/${room_id}/cards`;
		fetch(cards_url).then(res => {
			return res.json();
		}).then(json => {
			props.setCards(json);
		})

	}, [])

	const handleclick = () => {
		console.log('clicked')
	}
	return(
		<div>
			<div className = {classes.root}>
				<TextField className = {classes.input} id="outlined-basic" label="Category Name" variant="outlined" />
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


