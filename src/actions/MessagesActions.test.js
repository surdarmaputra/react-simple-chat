import { expect } from 'chai';

import * as types from '../constants/messages';
import * as actions from './MessagesActions';
import messages from '../samples/messages';

describe('MessagesActions', function() {
	beforeEach(function() {
		this.messages = messages;
		this.messageId = Object.keys(messages)[0];
		this.contact = {
			id: 'abc101',
			title: 'Python',
			meta: 'How are yo...'
		};
		this.message = {
			type: 'message',
			content: 'Hello',
			date: 'Nov 4'
		};
		this.information = {
			meta: 'Hello',
			date: 'Nov 4'
		};
	});

	it('should have initiateMessages(messages) with messages as array to initiate messages', function() {
		const expectedAction = {
			type: types.INITIATE_MESSAGES,
			messages: this.messages
		};
		expect(actions.initiateMessages(this.messages)).to.be.deep.equal(expectedAction);
	});

	it('should have appendMessage(contact, message) with contact as object and message as object to append message to contact', function() {
		const expectedAction = {
			type: types.APPEND_MESSAGE,
			contact: this.contact,
			message: this.message
		};	
		expect(actions.appendMessage(this.contact, this.message)).to.be.deep.equal(expectedAction);
	});	

	it('should have updateMessageInformation(messageId, information) with messageId as string or integer and information as object to update certain message information', function() {
		const expectedAction = {
			type: types.UPDATE_MESSAGE_INFORMATION,
			messageId: this.messageId,
			information: this.information
		};	
		expect(actions.updateMessageInformation(this.messageId, this.information)).to.be.deep.equal(expectedAction);
	});	
});

