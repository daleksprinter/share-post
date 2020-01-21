import React, {Component} from 'react';

class Login extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
   
    }

    render(){
        return(
            <div>
                <a href = 'http://share-pos-backend:8080/login' >Login Google</a>
            </div>
        )
    }
}

export default Login;
