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
    switch (action.type) {
        case GET_KEGS:
            return {
                ...state,
                kegs: action.payload,
                loading: false
            };
        case 'GET_KEG':
            return {
                ...state,
                selectedKeg: state.kegs.map(keg => keg.rwbId === action.payload.rwbId ? action.payload : keg)
            }
        default:
            return {
                ...state
            }
    }
}

export default kegReducer;