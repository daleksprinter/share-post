import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addArea } from '../actions/Input'
import InputTxt from './InputTxt'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles({
	root: {
		position: 'fixed',
		bottom: '0',
		left: '0',
		width: '100%',
		textAlign: 'center',
	},
	container: {
		display: 'inline-block',
		bottom: '0',
		backgroundColor: 'silver',
	},
	inputs: {
		display: 'inline-block',
	},


	button: {
		display:'inline-block',
		
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
				<div className = {classes.inputs}>
					{inputs.inputs.map((e, i) => {
						return(
							<InputTxt id = {i} txt = {e} />
						)
					})}
				</div>
				<div className = {classes.button}>
					<Fab color="primary" aria-label="add" onClick = {handleclick} >
						<AddIcon />
					</Fab>
				</div>

			</div>
		</div>
	)
}
export default Inputs;
