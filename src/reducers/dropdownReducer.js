import { ITEM_SELECTED } from "../actions/types";

const INITIAL_STATE = {
    item: ''
}

const dropdownReducer = (name) => (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case `${name}/${ITEM_SELECTED}`:
            console.log(`${name} dropdown item selected`);
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}

export default dropdownReducer;