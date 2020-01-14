import React, {Component} from 'react';
import { withRouter } from 'react-router';

class Home extends Component{
    constructor(){
        super();
    }

    handleclick = (e) => {
        this.props.history.push(`/join`)
    }

    render(){
        return(
            <div>
                <div>this is home page</div>
                <button type = "button" onClick = {this.handleclick}>はじめる</button>
            </div>
        )
    }
}

export default withRouter(Home);