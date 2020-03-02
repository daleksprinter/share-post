import React, {Component} from 'react';
import { withRouter } from 'react-router';

class Home extends Component{

    handleclick = (e) => {
        this.props.history.push(`/join`)
    }

    render(){
	console.log(process.env.REACT_APP_BACKEND_HOST)
        return(
            <div>
            </div>
        )
    }
}

export default withRouter(Home);
