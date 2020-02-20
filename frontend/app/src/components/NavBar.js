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
        const url = `/isloggedin`
        fetch(url).then(res => {
            return res.text()
        }).then(txt => {
            this.setState({
                username: txt
            })
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
