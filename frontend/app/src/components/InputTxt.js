import React from 'react';
import {ItemTypes} from '../dnd/types'
import {useDrag} from 'react-dnd'
import ItemCard from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { editInput } from '../actions/Input'

import { useDispatch  } from "react-redux";
const useStyles = makeStyles({
	card: {
		minWidth: 275,
		margin:"4px",
		width:"7%",
		height:"200px",
		display:"inline-block",
	},
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


	return(
		<div
			ref = {drag}
			style = {{
				opacity: isDragging ? 0.5 : 1,
				cursor: 'move',

			}}
		>   
			<ItemCard className={classes.card}>
				<textarea onChange = {handlechange} placeholder = "input your idea">{props.txt}</textarea>
			</ItemCard>
		</div>
	)
}

export default InputTxt;
