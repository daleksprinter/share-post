import {createStore as reduxCreateStore, combineReducers } from 'redux';
import {roomReducer} from './reducers/Room';
import { categoryReducer } from './reducers/Category';
import { inputReducer } from './reducers/Input';

function createStore(){
    const store = reduxCreateStore(
        combineReducers({
            room:roomReducer,
            category:categoryReducer,
            inputs: inputReducer,
        })
    )
    return store
}

export default  createStore;
