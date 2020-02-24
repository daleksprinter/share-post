import React, { useState } from 'react';
import { withRouter } from 'react-router';
import JoinRoom from './JoinRoom'
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


function Join(props){

	const [value, setValue] = useState(0)
	const handlechange = (event, val) => {
		console.log(event, val)
		setValue(val)
	}
	return(
		<div>
			<Tabs value = {value} onChange = {handlechange} indicatorColor = "primary" textColor = "primary">
				<Tab label = "New Room" />
				<Tab label = "Add Room" />
			</Tabs>

			<TabPanel value = {value} index = {0} >
				<NewRoom history={props.history} />
			</TabPanel>
			<TabPanel value = {value} index = {1} >
				<JoinRoom history={props.history}/>
			</TabPanel>
		</div>
	)
}

export default withRouter(Join);
