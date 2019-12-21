import React, {Component} from 'react';
import ItemCard from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

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

function Card(props){
    const classes = useStyles();
    return(
        <ItemCard className = {classes.card}>
            <CardContent>
                <div>{props.data.id} {props.data.content}</div>
            </CardContent>
        </ItemCard>
    )
}


export default Card;
