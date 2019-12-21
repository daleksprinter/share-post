import { connect } from 'react-redux';
import * as input_actions from '../actions/Input';
import InputTxt from '../components/InputTxt';

const mapStateToProps = (state) => {
    return {
        inputs: state.inputs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editInput: (id, txt) => dispatch(input_actions.editInput(id, txt)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputTxt);

