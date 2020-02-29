import React, { useEffect, useState } from 'react';
import none from '../assets/img/google.png'
import Button from '@material-ui/core/Button';

import { makeStyles  } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	inputfile: {
		textAlign:'center',
	},
}));


function NotExist() {
	return (
		<img src = {none}/>
	)
}

function Exist(props) {
	return (
		<img src = {`https://share-pos.s3-ap-northeast-1.amazonaws.com/profile/${props.icon_url}`} />
	)
}



function Profile(props){
	const classes = useStyles()
	const [icon_url, set_icon_url] = useState("")
	const [username, set_username] = useState("")
	const [icon, set_icon] = useState("")

	useEffect(() => {
		const url = "/usr"
		fetch(url).then(res => {
			if(!res.ok){
				throw Error(res.statusText)
			}
			return res.json()
		}).then(json => {
			console.log(json)
			set_icon_url(json.Icon.String)
			set_username(json.nickname)
		}).catch(err => {
			console.log(err)
		})

	}, [])
	const handleClick = () => {
		console.log('clicked')
	}
	const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
	const handleChange = (e) => {
		const img = createObjectURL(e.target.files[0])
		set_icon(img)
		console.log('hoge', img)
	}
	return(
		<div>
			{icon_url === "" ? <NotExist /> : <Exist url = {icon_url}/>}
			<input type = 'file' onChange = {handleChange}/>
			<img src = {icon} />
			<div>
				{username}
			</div>
			<Button variant = "contained" color = "primary" onClick = {handleClick} >変更</Button>
		</div>
	)

}
export default Profile;
