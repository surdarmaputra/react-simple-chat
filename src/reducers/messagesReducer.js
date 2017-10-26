import * as messages from '../constants/messages';

const messagesReducer = (state = {}, action) => {
	let messageId, currentMessages;
	switch (action.type) {
		case messages.INITIATE_MESSAGES:
			return action.messages;
		case messages.APPEND_MESSAGE:
			messageId = action.contact.id;
			if (state.hasOwnProperty(`${messageId}`)) {
				currentMessages = Object.assign({}, state);
			} else {
				currentMessages = {};
				currentMessages[`${messageId}`].title = action.contact.title;
				currentMessages[`${messageId}`].meta = action.contact.meta;
				currentMessages[`${messageId}`].date = action.contact.date;
				currentMessages[`${messageId}`].image = action.contact.image;
				currentMessages[`${messageId}`].messages = [];
			}
			currentMessages[`${messageId}`].messages = [
				...currentMessages[`${messageId}`].messages,
				action.message
			];
			return Object.assign({}, state, currentMessages);
		case messages.UPDATE_MESSAGE_INFORMATION:
			messageId = action.messageId;
			currentMessages = Object.assign({}, state);
			currentMessages[`${messageId}`] = Object.assign({}, state[`${messageId}`], action.information);
			return currentMessages;
		default:
			return state;
	}
}

export default messagesReducer;
