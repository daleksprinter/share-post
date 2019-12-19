import {createStore as reduxCreateStore, combineReducers } from 'redux';
import {roomReducer} from './reducers/Room';

function createStore(){
    const store = reduxCreateStore(
        combineReducers({
            room:roomReducer,
        })
    )
    return store
}

export default  createStore;
