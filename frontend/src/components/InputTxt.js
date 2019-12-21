import React, {Component} from 'react';
import {ItemTypes} from '../dnd/types'
import {useDrag} from 'react-dnd'

function InputTxt(props) {

    const [{isDragging}, drag] = useDrag({
        item: { 
            type: ItemTypes.INPUTAREA,
            txt: props.txt,
            id: props.id,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const handlechange = (e) => {
        props.editInput(props.id, e.target.value);
        console.log(props.inputs.inputs)
    }

    return(
        <div
            ref = {drag}
            style = {{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',

            }}
        >
            <textarea onChange = {handlechange} placeholder = "input your idea">{props.txt}</textarea>
        </div>
    )
}

export default InputTxt;
