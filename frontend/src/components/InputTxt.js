import React, {Component} from 'react';

class InputTxt extends Component{

    constructor(props){
        super(props)
    }

    handlechange = (e) => {
        this.props.editInput(this.props.id, e.target.value);
        console.log(this.props.inputs.inputs)
    }

    render(){
        return(
            <div>
                <textarea onChange = {this.handlechange}>{this.props.txt}</textarea>
            </div>
        )
    }
}

export default InputTxt;
