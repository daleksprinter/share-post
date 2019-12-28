import React, {Component} from 'react';


class NavBar extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
        }
    }

    componentDidMount(){
        const url = "http://localhost:8080/isloggedin"
        fetch(url).then(res => {
            return res.text()
        }).then(txt => {
            this.setState({
                username: txt
            })
        })
    }

    render(){
        return(
            <div>
                <div>this is navbar page</div>
                <span>{this.state.username == "" ? <div>please login</div> : <div>{this.state.username}</div>}</span>                
            </div>
        )
    }
}

export default NavBar;