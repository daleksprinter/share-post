import { connect } from 'react-redux';
import * as actions from '../actions/Room';
import Room from '../components/Room';

const mapStateToProps = (state) => {
    return {
        room: state.room,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory : (category) => dispatch(actions.addCategory(category)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);

