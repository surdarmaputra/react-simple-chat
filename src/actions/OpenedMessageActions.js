import * as actions from '../constants/openedMessage';

export const openMessage = (contact, messageId, messageType = 'message') => {
	return {
		type: actions.OPEN_MESSAGE,
		contact,
		messageId,
		messageType
	}
}
