import React, { useEffect, useState } from 'react';
import none from '../assets/img/google.png'

function Profile(props){
	const [icon_url, set_icon_url] = useState("")
	const [username, set_username] = useState("")

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

	return(
		<div>
			{icon_url === "" ? <img src = {none} /> : <img src = {`https://share-pos.s3-ap-northeast-1.amazonaws.com/profile/${icon_url}`} />}
			<div>
				{username}
			</div>
		</div>
	)

}

export default Profile;
