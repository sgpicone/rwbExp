import {
    GET_KEGS,
    GET_KEG,
    WASH_KEG,
    SANI_KEG,
    BREAKDOWN_KEG,
    FILL_KEG,
    KICK_KEG,
    SELL_KEG,
    UNTAP_KEG,
    TAP_KEG,
    LOG_ISSUE_KEG
} from '../actions/types';

const initialState = {
    kegs: [],
    selectedKeg: {},
    loading: false
};

function kegReducer(state = initialState, action) {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
        case GET_KEGS:
            return {
                ...state,
                kegs: payload,
                loading: false
            };
        case GET_KEG:
            let newStuff = {
                ...state,
                selectedKeg: payload
            };
            console.log(newStuff);
            return newStuff;
        default:
            return {
                ...state
            }
    }
}

export default kegReducer;