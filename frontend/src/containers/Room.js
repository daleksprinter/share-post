import { connect } from 'react-redux';
import * as category_actions from '../actions/Category';
import * as room_actions from '../actions/Room';
import Room from '../components/Room';

const mapStateToProps = (state) => {
    return {
        room: state.room,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory : (category) => dispatch(room_actions.addCategory(category)),
        addCard : (card) => dispatch(category_actions.addCard(card)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);

