import * as openedMessage from '../constants/openedMessage';

const initialState = {
	contact: {
		id: null,
		title: null,
		meta: null,
		date: null,
		image: null
	},
	messageId: null
};

const openedMessageReducer = (state = initialState, action) => {
	switch(action.type) {
		case openedMessage.OPEN_MESSAGE:
			return {
				contact: {
					id: action.contact.id,
					title: action.contact.title,
					meta: action.contact.meta,
					date: action.contact.date,
					image: action.contact.image
				},
				messageId: action.messageId
			};
		default:
			return state;
	}
}

export default openedMessageReducer;
