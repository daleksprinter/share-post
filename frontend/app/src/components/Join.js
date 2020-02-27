import React, { useState } from 'react';
import { withRouter } from 'react-router';
import JoinRoom from './JoinRoom'
import { makeStyles  } from '@material-ui/core/styles';
import NewRoom from './NewRoom'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
function TabPanel(props){
	return(
		<div>
			{props.value === props.index && <div>{props.children}</div>}
		</div>
	)
}
const useStyles = makeStyles(theme => ({
	root: {
		textAlign:'center',
	},
	content: {
		display: 'inline-block',
		marginTop: theme.spacing(10),
	},
}));



function Join(props){

	const classes = useStyles()
	const [value, setValue] = useState(0)
	const handlechange = (event, val) => {
		setValue(val)
	}
	return(
		<div className = {classes.root}>
			<div className = {classes.content}>
				<Tabs value = {value} onChange = {handlechange} indicatorColor = "primary" textColor = "primary">
					<Tab label = "新規作成" />
					<Tab label = "部屋に入る" />
				</Tabs>

				<TabPanel value = {value} index = {0} >
					<NewRoom history={props.history} />
				</TabPanel>
				<TabPanel value = {value} index = {1} >
					<JoinRoom history={props.history}/>
				</TabPanel>
			</div>
		</div>
	)
}

export default withRouter(Join);
