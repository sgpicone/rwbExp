import KegDataService from '../services/kegs.service';

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
    LOG_ISSUE_KEG,
    setLoading
} from './types';

export const getKegs = () => async dispatch => {
    try {
        setLoading();
        const response = await KegDataService.getAll();
        console.log(response);

        dispatch({
            type: GET_KEGS,
            payload: response.data
        });
    } catch (err) {
        console.error(`error fetching kegs: ${err}`);
    }
};

export const getKeg = (rwbId) => async dispatch => {
    try {
        setLoading();
        const response = await KegDataService.get(rwbId);
        console.log(response);

        dispatch({
            type: GET_KEG,
            payload: response.data
        });
    } catch (err) {
        console.error(`error fetching keg ${rwbId}: ${err}`);
    }
};