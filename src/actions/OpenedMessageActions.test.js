import { expect } from 'chai';

import * as types from '../constants/openedMessage';
import * as actions from './OpenedMessageActions';

describe('OpenedMessageActions', function() {
	it('should have openMessage(contact, messageId, messageType) with contact as object, messageId as string or integer and messageType as string', function() {
		const contact = {
			id: 'c01',
			title: 'Contact 1'
		};
		const messageId = 'm01';
		const messageType = 'message';
		expect(actions.openMessage(contact, messageId)).to.be.deep.equal({
			type: types.OPEN_MESSAGE,
			contact,
			messageId,
			messageType: 'message'
		});
		expect(actions.openMessage(contact, messageId, messageType)).to.be.deep.equal({
			type: types.OPEN_MESSAGE,
			contact,
			messageId,
			messageType
		});
	});
	
	it('should have updateOpenedMessage() with messageId and contact as argument to update opened message\'s contact', function() {
		const updatedContact = {
			title: 'Updated'
		};
		const messageId = 'm01';
		expect(actions.updateOpenedMessage(messageId, updatedContact)).to.be.deep.equal({
			type: types.UPDATE_OPENED_MESSAGE,
			contact: updatedContact,
			messageId
		});
	});
});
