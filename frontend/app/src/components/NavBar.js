import React, {Component} from 'react';
import { withRouter } from 'react-router';

class NavBar extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
        }
    }

    componentDidMount(){
        const url = `/auth`
        fetch(url).then(res => {
		if(!res.ok){
			throw Error(res.statusText)
		}
            return res.json()
        }).then(json => {
            this.setState({
                username: json.nickname
            })
	}).catch(txt => {
		console.log(txt)
	})
    }

    handleclick = (e) => {
        this.props.history.push(`/`)
    }

    render(){
        return(
            <span>
                <button onClick = {this.handleclick}>Share-Pos</button>
                <span>this is navbar</span>
                <span>{this.state.username == "" ? <span>please login</span> : <span>{this.state.username}</span>}</span>                
            </span>
        )
    }
}

export default withRouter(NavBar);
