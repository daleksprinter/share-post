import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router';
import { Link  } from 'react-router-dom';

import { makeStyles  } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


function NavBar(props){
	const [username, setUsername] = useState("")
	useEffect(() => {
		const url = `/api/auth`
		console.log(url)
		fetch(url).then(res => {
			if(!res.ok){
				throw Error(res.statusText)
			}
			return res.json()
		}).then(json => {
			setUsername(json.nickname)
		}).catch(txt => {
			console.log(txt)
		})

	}, [])

	let handleclick = (e) => {
		this.props.history.push(`/`)
	}

	const useStyles = makeStyles(theme => ({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		lnk: {
			textDecoration: "none",
			color:'white',
			'&:visited': {
				color:'white',
			},
		}
	}));

	const classes = useStyles();
	
	let logout = () => {
		const url = "/api/logout"
		fetch(url).then(res => {
			if(!res.ok){
				throw Error(res.statusText)
			}
		}).catch(err => {
			console.log(err)
		})
	}

	return(
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>	
						<Link to = '/join' className = {classes.lnk}>
							Share-Post

						</Link>
					</Typography>
					<Typography variant = "h6" color="inherit">
						<span>{username === "" ? <Link to = '/login' className = {classes.lnk}>Login</Link> : <Link to = '/profile' className = {classes.lnk}>{username}</Link>}</span>             
					</Typography>
					<button onClick = {logout}>logout</button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default withRouter(NavBar);
