import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addArea } from '../actions/Input'
import InputTxt from './InputTxt'
const inputselector = (state) => state.inputs
function Inputs(props) {
	const dispatch = useDispatch();
	const inputs = useSelector(inputselector)
	console.log(inputs)
	const handleclick = () => {
		dispatch(addArea())
	}
	return(

		<div>
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
