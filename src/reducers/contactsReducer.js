import * as contacts from '../constants/contacts';

const contactsReducer = (state = [], action) => {
	switch (action.type) {
		case contacts.INITIATE_CONTACTS:
			return action.contacts;
		case contacts.UPDATE_CONTACT:
			return state.map(contact => {
				if (contact.id === action.id) return Object.assign({}, contact, action.contact);
				else return contact;
			});
		default:
			return state;
	}
}

export default contactsReducer;
