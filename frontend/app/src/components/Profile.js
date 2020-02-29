import React, { useEffect } from 'react';


function Profile(props){

	useEffect(() => {
		const url = "/usr"
		fetch(url).then(res => {
			if(!res.ok){
				throw Error(res.statusText)
			}
			return res.json()
		}).then(json => {
			console.log(json)
		}).catch(err => {
			console.log(err)
		})

	}, [])

	return(
		<div>profile</div>
	)
}

export default Profile;
