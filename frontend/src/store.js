import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer
});
store.dispatch({type: 'GET_KEGS'});
console.log(store.getState());

export default store;