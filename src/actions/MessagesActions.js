import * as actions from '../constants/messages';

export const initiateMessages = (messages) => {
	return {
		type: actions.INITIATE_MESSAGES,
		messages
	}
}

export const appendMessage = (contact, message) => {
	return {
		type: actions.APPEND_MESSAGE,
		contact,
		message
	}
}

export const updateMessageInformation = (messageId, information) => {
	return {
		type: actions.UPDATE_MESSAGE_INFORMATION ,
		messageId,
		information
	}
}
