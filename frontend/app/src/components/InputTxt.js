import React, {useState} from 'react';
import {ItemTypes} from '../dnd/types'
import {useDrag} from 'react-dnd'
import ItemCard from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { editInput } from '../actions/Input'

import { useDispatch  } from "react-redux";
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles({
	card: {
		minWidth: 275,
		width:"7%",
		height:"200px",
		margin: '20px 20px 5px 20px',
	},
	root: {
		display: 'inline-block',
	},
	input: {
		width: '90%',
		height: '90%',
		top: '20px',
	}
	
});


function InputTxt(props) {

	const [{isDragging}, drag] = useDrag({
		item: { 
			type: ItemTypes.INPUTAREA,
			txt: props.txt,
			id: props.id,
		},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	})

	const dispatch = useDispatch();
	const handlechange = (e) => {
		dispatch(editInput(props.id, e.target.value));
	}
	const classes = useStyles();

	const [isvisible, setisvisible] = useState(false)

	return(
		<div
			ref = {drag}
			style = {{
				opacity: isDragging ? 0.5 : 1,
				cursor: 'move',

			}}
			className = {classes.root}
		>   
			<div>
				<ItemCard className = {classes.card} >
					<TextField
						id="outlined-multiline-static"
						multiline
						rows="8"
						onChange = {handlechange}
						className = {classes.input}
					/>
				</ItemCard>
			</div>
		</div>
	)
}

export default InputTxt;
