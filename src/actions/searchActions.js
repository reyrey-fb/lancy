import { SEARCH_SUBMIT } from "./types";

//SearchBar Action Creator
export const submitSearch = (name, value) => {
    return (dispatch) => {
        dispatch({
            type: `${name}/${SEARCH_SUBMIT}`,
            value
        })
    }
}