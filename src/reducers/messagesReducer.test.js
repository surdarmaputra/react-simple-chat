import { expect } from 'chai';

import reducer from './messagesReducer';
import * as types from '../constants/messages';
import messages from '../samples/messages';

describe('messagesReducer', function() {
	it('should return initial state', function() {
		expect(reducer(undefined, {})).to.be.deep.equal({});
	});

	it('should handle INITIATE_MESSAGES', function() {
		expect(reducer(undefined, {
			type: types.INITIATE_MESSAGES,
			messages
		})).to.be.deep.equal(messages);
	});

	it('should handle APPEND_MESSAGE', function() {
		const availableContactId = Object.keys(messages)[0];
		const availableContact = {
			id: availableContactId,
			title: messages[availableContactId].title,
			date: messages[availableContactId].date,
			meta: messages[availableContactId].meta,
			image: messages[availableContactId].image
		};
		const newContact = {
			id: 'new01',
			title: 'New Contact',
			date: null,
			meta: null,
			image: messages[availableContactId].image
		};
		const message = {
			type: 'message',
			content: 'Hello',
			date: 'Nov 4'
		};
		let expectedMessages1 = Object.assign({}, messages);
		let expectedMessages2 = Object.assign({}, messages);
		expectedMessages1[availableContactId].messages = [
			...expectedMessages1[availableContactId].messages,
			message
		];
		expectedMessages2[newContact.id] = {
			title: newContact.title,
			date: newContact.date,
			meta: newContact.meta,
			image: newContact.image,
			messages: [message]
		};
		expect(reducer(messages, {
			type: types.APPEND_MESSAGE,
			contact: availableContact,
			message
		})).to.be.deep.equal(
			expectedMessages1
		);
		expect(reducer(messages, {
			type: types.APPEND_MESSAGE,
			contact: newContact,
			message
		})).to.be.deep.equal(
			expectedMessages2
		);
	});

	it('should handle UPDATE_MESSAGE_INFORMATION', function() {
		const messageId = Object.keys(messages)[0];
		const information = {
			meta: 'updated',
			date: 'Nov 4',
		};
		let expectedState = Object.assign({}, messages);
		expectedState[messageId] = Object.assign({}, expectedState[messageId], information);
		expect(reducer(messages, {
			type: types.UPDATE_MESSAGE_INFORMATION,
			messageId,
			information
		})).to.be.deep.equal(expectedState);
	});
});
