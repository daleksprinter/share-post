import React, {Component} from 'react';
import { withRouter } from 'react-router';

class Home extends Component{

    handleclick = (e) => {
        this.props.history.push(`/join`)
    }

    render(){
        return(
            <div>
            </div>
        )
    }
}

export default withRouter(Home);
