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
		case openedMessage.UPDATE_OPENED_MESSAGE:
			if (state.messageId === action.messageId) {
				return {
					contact: Object.assign({}, state.contact, action.contact),
					messageType: state.messageType,
					messageId: state.messageId
				};
			} else return state;
		default:
			return state;
	}
}

export default openedMessageReducer;
