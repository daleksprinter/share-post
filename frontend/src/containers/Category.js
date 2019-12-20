import { connect } from 'react-redux';
import * as category_actions from '../actions/Category';
import * as room_actions from '../actions/Room';
import Category from '../components/Category';

const mapStateToProps = (state) => {
    return {
        category: state.category,
        room: state.room
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCard : (card) => dispatch(category_actions.addCard(card)),
        addCategory : (category) => dispatch(room_actions.addCategory(category)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);

