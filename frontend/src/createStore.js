import {createStore as reduxCreateStore, combineReducers } from 'redux';
import {roomReducer} from './reducers/Room';
import { categoryReducer } from './reducers/Category';

function createStore(){
    const store = reduxCreateStore(
        combineReducers({
            room:roomReducer,
            category:categoryReducer,
        })
    )
    return store
}

export default  createStore;
