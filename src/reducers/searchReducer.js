const INITIAL_STATE = {
    value: ''
}

const searchReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SEARCH_SUBMIT':
            console.log('search submitted!');
            return {
                ...state,
                value: action.value.search
            }   
    default:
        return state;
    } 
}

export default searchReducer;