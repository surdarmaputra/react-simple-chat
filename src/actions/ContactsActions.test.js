import { expect } from 'chai';

import * as types from '../constants/contacts';
import * as actions from './ContactsActions';
import contacts from '../samples/contacts';

describe('ContactsActions', function() {
	beforeEach(function() {
		this.contacts = contacts;
	});
	it('should have initiateContacts(contacts) with contacts as array to initiate contacts', function() {
		const expectedAction = {
			type: types.INITIATE_CONTACTS,
			contacts: this.contacts
		};
		expect(actions.initiateContacts(this.contacts)).to.be.deep.equal(expectedAction);
	});

	it('should have updateContact(id, contact) with id as string or integer and contact as object to update certain contact', function() {
		const expectedAction = {
			type: types.UPDATE_CONTACT,
			id: this.contacts[0].id,
			contact: this.contacts[0]
		};	
		expect(actions.updateContact(this.contacts[0].id, this.contacts[0])).to.be.deep.equal(expectedAction);
	});	
});
