import React, {Component} from 'react';
import { withRouter } from 'react-router';
import JoinRoom from './JoinRoom'
import NewRoom from './NewRoom'
class Join extends Component{

    render(){
        return(
            <div>
                <div>this is home page</div>
		<NewRoom history={this.props.history} />
		<JoinRoom history={this.props.history}/>
	    </div>
       )
    }
}

export default withRouter(Join);
