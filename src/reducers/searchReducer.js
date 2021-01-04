import { SEARCH_SUBMIT } from "../actions/types";

const INITIAL_STATE = {
    value: ''
}

const searchReducer = name => (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case `${name}/${SEARCH_SUBMIT}`:
            console.log(`search submitted from the ${name}!`);
            return {
                ...state,
                value: action.value.search
            }   
    default:
        return state;
    } 
}

export default searchReducer;