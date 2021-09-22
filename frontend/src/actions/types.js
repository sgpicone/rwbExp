export const GET_BEER = "beers/get";
export const GET_BEERS = "beers/list";
export const ADD_BEER = "beers/add";
export const EDIT_BEER = "beers/edit";
export const UNTAP_BEER = "beers/tap";
export const TAP_BEER = "beers/untap";


export const GET_KEGS = "kegs/list";
export const GET_KEG = "kegs/get";
export const WASH_KEG = "kegs/wash";
export const SANI_KEG = "kegs/sani";
export const BREAKDOWN_KEG = "kegs/breakdown";
export const FILL_KEG = "kegs/fill";
export const KICK_KEG = "kegs/kick";
export const SELL_KEG = "kegs/sell";
export const UNTAP_KEG = "kegs/tap";
export const TAP_KEG = "kegs/untap";
export const LOG_ISSUE_KEG = "kegs/addissue";


export const WASH_KEGS = "kegs/bulk/wash";
export const SANI_KEGS = "kegs/bulk/sani";
export const BREAKDOWN_KEGS = "kegs/bulk/breakdown";
export const FILL_KEGS = "kegs/bulk/fill";
export const KICK_KEGS = "kegs/bulk/kick";
export const SELL_KEGS = "kegs/bulk/sell";
export const UNTAP_KEGS = "kegs/bulk/tap";
export const TAP_KEGS = "kegs/bulk/untap";

export const SET_LOADING = 'loading';

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};