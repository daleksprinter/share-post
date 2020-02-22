import React from 'react';
import { withRouter } from 'react-router';
import JoinRoom from './JoinRoom'
import NewRoom from './NewRoom'

function Join(props){
        return(
            <div>
		<NewRoom history={props.history} />
		<JoinRoom history={props.history}/>
	    </div>
       )
}

export default withRouter(Join);
