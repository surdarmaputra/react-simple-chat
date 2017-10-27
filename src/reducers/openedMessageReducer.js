import * as openedMessage from '../constants/openedMessage';

const initialState = {
	contact: {
		id: null,
		title: null,
		meta: null,
		date: null,
		image: null
	},
	messageType: null,
	messageId: null
};

const openedMessageReducer = (state = initialState, action) => {
	switch(action.type) {
		case openedMessage.OPEN_MESSAGE:
			return {
				contact: Object.assign({}, action.contact),
				messageType: action.messageType,
				messageId: action.messageId
			};
		default:
			return state;
	}
}

export default openedMessageReducer;
