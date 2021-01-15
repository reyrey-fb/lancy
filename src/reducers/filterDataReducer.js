import { GET_HOURLY_DATA } from "../actions/types";

const INITIAL_STATE = {
    data: []
}

const filterDataReducer = ( state= INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_HOURLY_DATA:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export default filterDataReducer;