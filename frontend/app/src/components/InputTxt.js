import React, {Component} from 'react';
import {ItemTypes} from '../dnd/types'
import {useDrag} from 'react-dnd'
import ItemCard from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles({
    card: {
      minWidth: 275,
      margin:"4px",
      width:"7%",
      height:"200px",
      display:"inline-block",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


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
    const classes = useStyles();
    return(
        <div
            ref = {drag}
            style = {{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',

            }}
        >   
            <ItemCard className={classes.card}>
                <textarea onChange = {handlechange} placeholder = "input your idea">{props.txt}</textarea>
            </ItemCard>
        </div>
    )
}

export default InputTxt;