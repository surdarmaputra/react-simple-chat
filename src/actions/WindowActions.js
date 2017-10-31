import * as actions from '../constants/window';

export const setWindowInformation = (title, meta) => {
	return {
		type: actions.SET_WINDOW_INFORMATION,
		title,
		meta
	}
}
