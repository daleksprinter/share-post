import React from 'react';
import ItemCard from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
	card: {
		minWidth: 275,
		margin:"4px",
		width:"7%",
		height:"200px",
		display:"inline-block",
	},
});

function Card(props){
	const classes = useStyles();
	return(
		<ItemCard className = {classes.card}>
			<CardContent>
				<div>{props.data.created_user_name}</div>
				<div>{props.data.content}</div>
			</CardContent>
		</ItemCard>
	)
}


export default Card;
