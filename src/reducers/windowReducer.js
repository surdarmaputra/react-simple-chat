import * as window from '../constants/window';

const initialState = {
	title: 'React Simple Chat',
	meta: 'Have fun!'
};

const windowReducer = (state = initialState, action) => {
	switch(action.type) {
		case window.SET_WINDOW_INFORMATION:
			return {
				title: action.title,
				meta: action.meta
			}
		default:
			return state;
	}
}

export default windowReducer;
