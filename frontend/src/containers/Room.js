import { connect } from 'react-redux';
import * as category_actions from '../actions/Category';
import * as room_actions from '../actions/Room';
import * as input_actions from '../actions/Input'
import Room from '../components/Room';

const mapStateToProps = (state) => {
    return {
        room: state.room,
        inputs: state.inputs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory : (category) => dispatch(room_actions.addCategory(category)),
        addCard : (card) => dispatch(category_actions.addCard(card)),
        addInput: () => dispatch(input_actions.addArea()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);

