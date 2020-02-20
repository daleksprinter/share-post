import React, {Component} from 'react';
import Card from './Card'
import { ItemTypes } from '../dnd/types';
import {useDrop} from 'react-dnd';


function Category(props){


    const post_card = (txt, id) => {
        const {params} = props.match
        const room_id = params.id
        console.log(room_id)
        const url = `/rooms/${room_id}/categories/${props.data.id}/cards`;
        fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                content: txt
            })
        }).then(res => {
            console.log("post succeed")
        })
    }

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.INPUTAREA,
        drop: (item, monitor, comp) => post_card(monitor.getItem().txt, monitor.getItem().id),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
     })


    return(
        <div
            ref = {drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <div>{props.data.Title}</div>
            {props.category.cards.map(card => {
                return (
                    props.data.id == card.category_id ? <Card data = {card} /> : ''
                )
            })}
            {isOver && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                    }}
                />
            )}
        </div>
    )
}

export default Category;
