import { expect } from 'chai';

import * as types from '../constants/openedMessage';
import * as actions from './OpenedMessageActions';

describe('OpenedMessageActions', function() {
	it('should have openMEssage(contact, messageId, messageType) with contact as object, messageId as string or integer and messageType as string', function() {
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
});
