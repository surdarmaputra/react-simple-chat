import * as search from '../constants/search';

const searchReducer = (state = '', action) => {
	switch (action.type) {
		case search.SET_SEARCH_KEYWORD:
			return action.keyword;
		case search.CLEAR_SEARCH_KEYWORD:
			return ''; 
		default:
			return state; 	
	}
}

export default searchReducer;
