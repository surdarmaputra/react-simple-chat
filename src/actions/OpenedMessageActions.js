import * as actions from '../constants/openedMessage';

export const openMessage = (contact, messageId) => {
	return {
		type: actions.OPEN_MESSAGE,
		contact,
		messageId
	}
}
