import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import ConnectedSidebarContactWindow, { SidebarContactWindow } from './SidebarContactWindow';
import SidebarTabMenu from './SidebarTabMenu';
import ContactWindow from '../../components/ContactWindow';
import Contact from '../../components/Contact';
import configureStore from '../../configureStore';

import { initiateContacts } from '../../actions/ContactsActions';
import { initiateMessages } from '../../actions/MessagesActions';
import { initiateNotes } from '../../actions/NotesActions';
import { setWindowInformation} from '../../actions/WindowActions';
import { openMessage } from '../../actions/OpenedMessageActions';

import contacts from '../../samples/contacts';
import messages from '../../samples/messages';
import notes from '../../samples/notes';

const store = configureStore();
const dispatch = sinon.spy(store, 'dispatch');
store.dispatch(initiateContacts(contacts));
store.dispatch(initiateMessages(messages));
store.dispatch(initiateNotes(notes));

const App = () => (
	<Provider store={store}>
		<MemoryRouter>
			<div>
				<SidebarTabMenu />
				<ConnectedSidebarContactWindow />
			</div>
		</MemoryRouter>
	</Provider>
);

describe('<SidebarContactWindow />', function() {
	beforeEach(function() {
		this.sidebarContactWindow = mount(<App />);
		this.openMessage = sinon.spy(this.sidebarContactWindow.find(SidebarContactWindow).instance(), 'openMessage');
		this.openNote = sinon.spy(this.sidebarContactWindow.find(SidebarContactWindow).instance(), 'openNote');
	});

	afterEach(function() {
		this.openMessage.restore();
		this.openNote.restore();
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

		it('should pass openMessage() method to ContactWindow\'s onContactClick props for route /', function() {
			this.sidebarContactWindow.find('a[href="/"]').simulate('click', { button: 0 });
			this.sidebarContactWindow.find(ContactWindow).find('.contact').at(0).simulate('click');
			expect(this.openMessage.called).to.be.equal(true);
		});

		it('should contain Route for contacts window', function() {
			this.sidebarContactWindow.find('a[href="/contacts"]').simulate('click', { button: 0 });
			expect(this.sidebarContactWindow.find('.contact-window').length).to.be.equal(1);
			expect(this.sidebarContactWindow.find('.contact-window').contains(contacts[0].title)).to.be.equal(true);
			expect(this.sidebarContactWindow.find('.contact-window').find('.contact').length).to.be.equal(contacts.length);
		});

		it('should pass openMessage() method to ContactWindow\'s onContactClick props for route /contacts', function() {
			this.sidebarContactWindow.find('a[href="/contacts"]').simulate('click', { button: 0 });
			this.sidebarContactWindow.find(ContactWindow).find('.contact').at(0).simulate('click');
			expect(this.openMessage.called).to.be.equal(true);
		});

		it('should contain Route for notes window', function() {
			const noteKeys = Object.keys(notes);
			const noteSample = notes[noteKeys[0]];
			this.sidebarContactWindow.find('a[href="/notes"]').simulate('click', { button: 0 });
			expect(this.sidebarContactWindow.find('.contact-window').length).to.be.equal(1);
			expect(this.sidebarContactWindow.find('.contact-window').contains(noteSample.title)).to.be.equal(true);
			expect(this.sidebarContactWindow.find('.contact-window').find('.contact').length).to.be.equal(noteKeys.length);
		});

		it('should pass openNote() method to ContactWindow\'s onContactClick props for route /notes', function() {
			this.sidebarContactWindow.find('a[href="/notes"]').simulate('click', { button: 0 });
			this.sidebarContactWindow.find(ContactWindow).find('.contact').at(0).simulate('click');
			expect(this.openNote.called).to.be.equal(true);
		});

		describe('SidebarContactWindow.openMessage()', function() {
			beforeEach(function() {
				dispatch.reset();
				this.availableMessageKeys = Object.keys(messages);
				this.contactHasMessage = contacts.filter((contact) => this.availableMessageKeys.includes(contact.id));
				this.contactWithoutMessage = contacts.filter((contact) => !this.availableMessageKeys.includes(contact.id));
			});

			it('should dispatch openMessage() action if contactId passed to instance.openMessage() is available in contact', function() {
				const contactSample = this.contactHasMessage[0];
				const expectedAction = openMessage(contactSample, contactSample.id);
				this.sidebarContactWindow.find(SidebarContactWindow).instance().openMessage(contactSample.id);
				expect(dispatch.callCount).to.be.equal(2);
				expect(dispatch.getCall(0).args[0]).to.be.deep.equal(expectedAction);
			});

			it('should dispatch setWindowInformation() action if contactId passed to instance.openMessage() is available in contact', function() {
				const contactSample = this.contactHasMessage[0];
				const expectedAction = setWindowInformation(contactSample.title, `Last conversation: ${messages[contactSample.id].date}`);
				this.sidebarContactWindow.find(SidebarContactWindow).instance().openMessage(contactSample.id);
				expect(dispatch.callCount).to.be.equal(2);
				expect(dispatch.getCall(1).args[0]).to.be.deep.equal(expectedAction);
			});

			it('should dispatch setWindowInformation() action with "Last conversation: never" as meta data if contactId passed to instance.openMessage() is available in contact but not message yet', function() {
				const contactSample = this.contactWithoutMessage[0];
				const expectedAction = setWindowInformation(contactSample.title, 'Last conversation: never');
				this.sidebarContactWindow.find(SidebarContactWindow).instance().openMessage(contactSample.id);
				expect(dispatch.callCount).to.be.equal(2);
				expect(dispatch.getCall(1).args[0]).to.be.deep.equal(expectedAction);
			});

			it('should dispatch nothing if contactId passed to instance.openMessage() is not available in contact', function() {
				const unavailableContactId = 'un101';
				this.sidebarContactWindow.find(SidebarContactWindow).instance().openMessage(unavailableContactId);
				expect(dispatch.callCount).to.be.equal(0);
			});
		});

		describe('SidebarContactWindow.openNote()', function() {
			beforeEach(function() {
				dispatch.reset();
				this.availableNoteKeys = Object.keys(notes);
			});

			it('should dispatch openMessage() action if noteId passed to instance.openNote() is available in notes', function() {
				let title, meta, date, latestMonth;
				const selectedNoteId = this.availableNoteKeys[0];
				({ title, meta, date, latestMonth } = notes[selectedNoteId]);
				const expectedAction = openMessage({ id: selectedNoteId, title, meta, date, latestMonth }, selectedNoteId, 'note');
				this.sidebarContactWindow.find(SidebarContactWindow).instance().openNote(selectedNoteId);
				expect(dispatch.callCount).to.be.equal(2);
				expect(dispatch.getCall(0).args[0]).to.be.deep.equal(expectedAction);
			});

			it('should dispatch setWindowInformation() action if noteId passed to instance.openNote() is available in notes', function() {
				let title, date;
				const selectedNoteId = this.availableNoteKeys[0];
				({ title, date} = notes[selectedNoteId]);
				const expectedAction = setWindowInformation(title, `Last updated: ${date}`);
				this.sidebarContactWindow.find(SidebarContactWindow).instance().openNote(selectedNoteId);
				expect(dispatch.callCount).to.be.equal(2);
				expect(dispatch.getCall(1).args[0]).to.be.deep.equal(expectedAction);
			});

			it('should dispatch setWindowInformation() action with "Last updated: never" as meta data if note has no date or date is null', function() {
				let customNotes = notes;
				let title;
				const selectedNoteId = this.availableNoteKeys[0];
				customNotes[this.availableNoteKeys[0]]['date'] = null; 
				store.dispatch(initiateNotes(customNotes));
				dispatch.reset();
				({ title } = customNotes[selectedNoteId]);
				const expectedAction = setWindowInformation(title, 'Last updated: never');
				this.sidebarContactWindow.find(SidebarContactWindow).instance().openNote(selectedNoteId);
				expect(dispatch.callCount).to.be.equal(2);
				expect(dispatch.getCall(1).args[0]).to.be.deep.equal(expectedAction);
			});

			it('should dispatch nothing if noteId passed to instance.openNote() is not available in notes', function() {
				store.dispatch(initiateNotes(notes));
				dispatch.reset();
				const unavailableNoteId = 'un101';
				this.sidebarContactWindow.find(SidebarContactWindow).instance().openNote(unavailableNoteId);
				expect(dispatch.callCount).to.be.equal(0);
			});
		});

	});
});
