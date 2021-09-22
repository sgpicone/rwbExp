const initialState = {
    beers: [],
    selectedBeer: {}
};

function beerReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_BEERS':
            return {
                ...state
            };
        case 'GET_BEER':
            return {
                ...state,
                selectedBeer: state.beers.map(beer => beer.rwbId === action.payload.rwbId ? action.payload : beer)
            }
        default:
            return {
                ...state
            }
    }
}

export default beerReducer;