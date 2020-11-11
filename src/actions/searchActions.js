//SearchBar Action Creator
export const submitSearch = value => {
    return (dispatch) => {
        dispatch({
            type: 'SEARCH_SUBMIT',
            value
        })
    }
}