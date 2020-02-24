import React, {useEffect} from 'react';
import Category from '../containers/Category'
import Inputs from './Inputs' 

function Room(props){

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

	return(
		<div>
			{props.room.categories.map(category => {
				return (
					<div>
						<Category data = {category} match = {props.match}/>
					</div>
				)
			})}
			<Inputs />

		</div>
	)
}


export default Room;


