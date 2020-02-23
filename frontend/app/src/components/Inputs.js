import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addArea } from '../actions/Input'
import InputTxt from './InputTxt'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		backgroundColor: 'black',
		position: 'fixed',
		left: '50%',
		top: '80%',
	},
})

const inputselector = (state) => state.inputs
function Inputs(props) {
	const dispatch = useDispatch();
	const inputs = useSelector(inputselector)

	const handleclick = () => {
		dispatch(addArea())
	}
	
	const classes = useStyles()
	return(
		<div className = {classes.root}>
			{inputs.inputs.map((e, i) => {
				return(
					<InputTxt id = {i} txt = {e} />
				)
			})}
			<button onClick={handleclick}>addarea</button>
		</div>
	)
}
export default Inputs;
