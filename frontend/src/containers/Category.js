import { connect } from 'react-redux';
import * as actions from '../actions/Category';
import Category from '../components/Category';

const mapStateToProps = (state) => {
    return {
        category: state.category,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCard : (card) => dispatch(actions.addCard(card)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);

