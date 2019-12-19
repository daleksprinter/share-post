import {createStore as reduxCreateStore, combineReducers } from 'redux';
import {categoryReducer} from './reducers/Category';

function createStore(){
    const store = reduxCreateStore(
        combineReducers({
            category:categoryReducer,
        })
    )
    return store
}

export default  createStore;
