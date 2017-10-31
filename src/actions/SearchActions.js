import * as actions from '../constants/search';

export const setSearchKeyword = (keyword) => {
	return {
		type: actions.SET_SEARCH_KEYWORD,
		keyword 
	}
}

export const clearSearchKeyword = () => {
	return {
		type: actions.CLEAR_SEARCH_KEYWORD 
	}
}
