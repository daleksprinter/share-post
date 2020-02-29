import React, { useEffect, useState } from 'react';
import none from '../assets/img/google.png'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles  } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	inputfile: {
		textAlign:'center',
	},
	icon : {
		width : theme.spacing(10),
		height : theme.spacing(10),
	}
}));


function NotExist() {
	const classes = useStyles()
	return (
		<img src = {none} className = {classes.icon}/>
	)
}

function Exist(props) {
	const classes = useStyles()
	return (
		<img src = {`https://share-pos.s3-ap-northeast-1.amazonaws.com/profile/${props.url}`} className = {classes.icon}/>
	)
}



function Profile(props){
	const classes = useStyles()
	const [icon_url, set_icon_url] = useState("")
	const [username, set_username] = useState("")
	const [icon, set_icon] = useState()
	const [filedata, set_filedata] = useState()

	useEffect(() => {
		const url = "/usr"
		fetch(url).then(res => {
			if(!res.ok){
				throw Error(res.statusText)
			}
			return res.json()
		}).then(json => {
			set_icon_url(json.Icon.String)
			set_username(json.nickname)
		}).catch(err => {
			console.log(err)
		})

	}, [])
	const handleClick = () => {
		const formdata = new FormData()
		formdata.append('image', filedata)
		formdata.append('username', username)
		const url = '/user'
		fetch(url, {
			method: 'PUT',
			body: formdata,
		}).then(res => {
			if(!res.ok){
				throw Error(res.statusText)
			}
		}).catch(err => {
			console.log(err)
		})
	}
	const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
	const handleChange = (e) => {
		const img = createObjectURL(e.target.files[0])
		set_icon(img)
		set_filedata(e.target.files[0])
	}
	const handletxtchange = (e) => {
		set_username(e.target.value)
	}
	return(
		<div>
			{icon_url === "" ? <NotExist /> : <Exist url = {icon_url}/>}
			<input type = 'file' onChange = {handleChange}/>
			<img src = {icon} className = {classes.icon}/>
			<div>
				<TextField onChange = {handletxtchange} value = {username} />
			</div>
			<Button variant = "contained" color = "primary" onClick = {handleClick} >変更</Button>
		</div>
	)

}
export default Profile;
