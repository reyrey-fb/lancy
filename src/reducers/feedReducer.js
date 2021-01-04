import { FEED_FETCHED } from "../actions/types";

const INITIAL_STATE = {
    feed: []
}

const feedReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case FEED_FETCHED: 
            return {
                ...state,
                feed: action.payload 
            }
        default:
            return state;
        }
    }

export default feedReducer;