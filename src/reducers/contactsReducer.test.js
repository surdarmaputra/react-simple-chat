import { expect } from 'chai';

import reducer from './contactsReducer';
import * as types from '../constants/contacts';
import contacts from '../samples/contacts';

describe('contactsReducer', function() {
	it('should return initial state', function() {
		expect(reducer(undefined, {})).to.be.deep.equal([]);
	});

	it('should handle INITIATE_CONTACTS', function() {
		expect(reducer(undefined, {
			type: types.INITIATE_CONTACTS,
			contacts
		})).to.be.deep.equal(contacts);
	});

	it('should handle UPDATE_CONTACT', function() {
		const id = contacts[0].id;
		const updatedContact = {
			title: 'updated'
		};
		const expectedState = contacts.map(contact => {
			if (contact.id === id) return Object.assign({}, contact, updatedContact);
			else return contact;
		});
		expect(reducer(contacts, {
			type: types.UPDATE_CONTACT,
			id,
			contact: updatedContact
		})).to.be.deep.equal(expectedState);
	});
});
