import { combineReducers } from 'redux';
import beerReducer from './beerReducer';
import kegReducer from './kegReducer';

export default combineReducers({
    beer: beerReducer,
    keg: kegReducer
});