import React, {Component} from 'react';
import { withRouter } from 'react-router';

class Home extends Component{

    handleclick = (e) => {
        this.props.history.push(`/join`)
    }

    render(){
        return(
            <div>
				this is home page		
            </div>
        )
    }
}

export default withRouter(Home);
