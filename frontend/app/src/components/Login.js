import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import  google  from '../assets/img/google.png';
const useStyles = makeStyles(theme => ({
	root: {
		flexWrap: 'wrap',
		marginTop: theme.spacing(10),
		'& > *': {
			width: theme.spacing(48),
			height: theme.spacing(48),
		},
	},
	paper: {
		margin: 'auto',
		textAlign: 'center',
	},
	img: {
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
	lnk: {
		border : 'solid 2px gray',
		borderRadius: theme.spacing(4),
		padding : theme.spacing(1),
		textDecoration: "none",
		'&:visited': {
			color: 'gray',
		},
		display: 'flex',
	},
	links: {
		marginTop: theme.spacing(10),
		display: 'inline-block',
	},
	msg: {
		margin: theme.spacing(0.5),
	}

}));

function Login(props){
	const classes = useStyles()
	console.log(google)
	return(
		<div className = {classes.root}>
			<Paper className = {classes.paper}>
				
				<div className = {classes.links}>
					<a href = {`/api/login`} className = {classes.lnk}>
						<img src = {google} className = {classes.img}/>
						<div className = {classes.msg}>Googleアカウントでログイン</div>
					</a>
				</div>
			</Paper>
		</div>
	)
}
export default Login;
