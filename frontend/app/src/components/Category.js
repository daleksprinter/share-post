import React, {useState} from 'react';
import Card from './Card'
import { ItemTypes } from '../dnd/types';
import {useDrop} from 'react-dnd';

import Typography from '@material-ui/core/Typography';

function Category(props){
	const [open, set_open] = useState(true)

	const post_card = (txt, id) => {
		const {params} = props.match
		const room_id = params.id
		const url = `/api/rooms/${room_id}/categories/${props.data.id}/cards`;
		fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				content: txt
			})
		}).then(res => {
			if(!res.ok){
				throw Error(res.statusText)
			}
		}).catch(txt => {
			console.log(txt)
		})
	}

	const [{isOver}, drop] = useDrop({
		accept: ItemTypes.INPUTAREA,
		drop: (item, monitor, comp) => post_card(monitor.getItem().txt, monitor.getItem().id),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		})
	})

	const handleclick = () => {
		set_open(!open)
	}
	return(
		<div
			ref = {drop}
			style={{
				position: 'relative',
				width: '70%',
				height: '100%',
				backgroundColor: '#EEEEEE',
				margin: "5px",
				padding: "10px",
			}}
			onClick = {handleclick}
		>
			<Typography variant = 'body2'>{props.data.Title}</Typography>
			
			{open ? <div>
				{props.category.cards.map(card => {
					return (
					props.data.id === card.category_id ? <Card data = {card} /> : ''
				)
				})}

			</div> : <div />}
			{isOver && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: '100%',
						width: '100%',
						zIndex: 1,
						opacity: 0.5,
						backgroundColor: 'yellow',
					}}
				/>
			)}
		</div>
	)
}

export default Category;
