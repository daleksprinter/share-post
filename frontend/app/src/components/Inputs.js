import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addArea } from '../actions/Input'
import InputTxt from './InputTxt'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		bottom: '0',
		left: '0',
		width: '100%',
		textAlign: 'center',
	},
	container: {
		backgroundColor: 'gray',
		display: 'inline-block',
		padding: '30px',
	}
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
			<div className = {classes.container}>
				{inputs.inputs.map((e, i) => {
					return(
						<InputTxt id = {i} txt = {e} />
					)
				})}
				<button onClick={handleclick}>addarea</button>
			</div>
		</div>
	)
}
export default Inputs;
