import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import SidebarContactWindow from './SidebarContactWindow';
import SidebarTabMenu from './SidebarTabMenu';
import configureStore from '../../configureStore';

import { initiateContacts } from '../../actions/ContactsActions';
import { initiateMessages } from '../../actions/MessagesActions';
import { initiateNotes } from '../../actions/NotesActions';

import contacts from '../../samples/contacts';
import messages from '../../samples/messages';
import notes from '../../samples/notes';

const store = configureStore();
store.dispatch(initiateContacts(contacts));
store.dispatch(initiateMessages(messages));
store.dispatch(initiateNotes(notes));

const App = () => (
	<Provider store={store}>
		<MemoryRouter>
			<div>
				<SidebarTabMenu />
				<SidebarContactWindow />
			</div>
		</MemoryRouter>
	</Provider>
);

describe('<SidebarContactWindow />', function() {
	beforeEach(function() {
		this.sidebarContactWindow = mount(<App />);
	});

	it('should render sidebar__contact-window', function() {
		expect(this.sidebarContactWindow.find('.sidebar__contact-window').length).to.be.equal(1);
	});

	describe('integration test', function() {
		it('should contain Route for messages window', function() {
			const messageKeys = Object.keys(messages);
			const messageSample = messages[messageKeys[0]];
			this.sidebarContactWindow.find('a[href="/"]').simulate('click', { button: 0 });
			expect(this.sidebarContactWindow.find('.contact-window').length).to.be.equal(1);
			expect(this.sidebarContactWindow.find('.contact-window').contains(messageSample.title)).to.be.equal(true);			
			expect(this.sidebarContactWindow.find('.contact-window').find('.contact').length).to.be.equal(messageKeys.length);
		});

		it('should contain Route for contacts window', function() {
			this.sidebarContactWindow.find('a[href="/contacts"]').simulate('click', { button: 0 });
			expect(this.sidebarContactWindow.find('.contact-window').length).to.be.equal(1);
			expect(this.sidebarContactWindow.find('.contact-window').contains(contacts[0].title)).to.be.equal(true);
			expect(this.sidebarContactWindow.find('.contact-window').find('.contact').length).to.be.equal(contacts.length);
		});

		it('should contain Route for notes window', function() {
			const noteKeys = Object.keys(notes);
			const noteSample = notes[noteKeys[0]];
			this.sidebarContactWindow.find('a[href="/notes"]').simulate('click', { button: 0 });
			expect(this.sidebarContactWindow.find('.contact-window').length).to.be.equal(1);
			expect(this.sidebarContactWindow.find('.contact-window').contains(noteSample.title)).to.be.equal(true);
			expect(this.sidebarContactWindow.find('.contact-window').find('.contact').length).to.be.equal(noteKeys.length);
		});
	});
});
