import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import ConnectedMainWindow, { MainWindow } from './MainWindow.js';
import { MainInput } from './MainInput.js';
import MessageWindow from '../../components/MessageWindow';
import MessageBox from '../../components/MessageBox';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

import configureStore from '../../configureStore';
import { initiateContacts } from '../../actions/ContactsActions';
import { initiateMessages, appendMessage, updateMessageInformation } from '../../actions/MessagesActions';
import { initiateNotes, appendNote, updateNoteInformation, removeNote } from '../../actions/NotesActions';
import { setWindowInformation } from '../../actions/WindowActions';
import { openMessage } from '../../actions/OpenedMessageActions';

import contacts from '../../samples/contacts';
import messages from '../../samples/messages';
import notes from '../../samples/notes';

const store = configureStore();
const dispatch = sinon.spy(store, 'dispatch');
store.dispatch(initiateContacts(contacts));
store.dispatch(initiateMessages(messages));
store.dispatch(initiateNotes(notes));

const App = (props) => (
	<Provider store={store}>
		<MemoryRouter>
			<ConnectedMainWindow />
		</MemoryRouter>
	</Provider>
);

describe('<MainWindow />', function() {
	beforeEach(function() {
		const messageIds = Object.keys(messages);
		this.noteIds = Object.keys(notes);
		this.contactHaveMessage = contacts.filter((contact) => messageIds.includes(contact.id));
		this.contactWithoutMessage = contacts.filter((contact) => !messageIds.includes(contact.id));
		this.mainWindow = mount(<App />);
	});
	
	it('should return list of messages based on opened message ID', function() {
		const selectedContact = this.contactHaveMessage[0];
		const selectedContactMessages = messages[selectedContact.id].messages;
		store.dispatch(openMessage(selectedContact, selectedContact.id, 'message'));
		const activeMessages = this.mainWindow.find(MainWindow).instance().getOpenedMessage();
		expect(activeMessages.length).to.be.equal(selectedContactMessages.length);
		selectedContactMessages.forEach((message, index) => {
			expect(activeMessages[index].type).to.be.equal(message.type);
			expect(activeMessages[index].content).to.be.equal(message.content);
			expect(activeMessages[index].messageType).to.be.equal('message');
			expect(activeMessages[index].options.constructor).to.be.equal(Array);
		});
	});

	it('should return list of notes based on opened note ID', function() {
		const selectedNote = notes[this.noteIds[0]];
		store.dispatch(openMessage(selectedNote, this.noteIds[0], 'note'));
		const activeMessages = this.mainWindow.find(MainWindow).instance().getOpenedMessage();
		expect(activeMessages.length).to.be.equal(selectedNote.notes.length);
		selectedNote.notes.forEach((note, index) => {
			expect(activeMessages[index].type).to.be.equal(note.type);
			expect(activeMessages[index].content).to.be.equal(note.content);
			expect(activeMessages[index].messageType).to.be.equal('note');
			expect(activeMessages[index].options.constructor).to.be.equal(Array);
		});
	});
	
	it('should return empty array if opened message type neither message nor note', function() {
		const selectedContact = this.contactHaveMessage[0];
		const selectedContactMessages = messages[selectedContact.id].messages;
		store.dispatch(openMessage(selectedContact, selectedContact.id, 'another-type'));
		const activeMessages = this.mainWindow.find(MainWindow).instance().getOpenedMessage();
		expect(activeMessages.length).to.be.equal(0);
	});

	it('should return list of notes information if getNotes() called', function() {
		const expectedList = this.noteIds.map(noteId => {
			const { title, meta, date, latestMonth }= notes[noteId];
			return {
				id: noteId,
				title,
				meta,
				date,
				latestMonth
			};
		});
		const result = this.mainWindow.find(MainWindow).instance().getNotes();
		expect(result).to.be.deep.equal(expectedList);
	});

	it('should have apppend to note feature in message option', function() {
		const openNoteListModal = sinon.spy(this.mainWindow.find(MainWindow).instance(), 'openNoteListModal');
		const noteListModalToggle = sinon.spy(this.mainWindow.find(MainWindow).instance().noteListModal, 'toggle');
		const selectedContact = this.contactHaveMessage[0];
		const selectedContactMessages = messages[selectedContact.id].messages;
		store.dispatch(openMessage(selectedContact, selectedContact.id, 'message'));
		const activeMessages = this.mainWindow.find(MainWindow).instance().getOpenedMessage();
		activeMessages[activeMessages.length - 1].options[0].callback();
		expect(openNoteListModal.callCount).to.be.equal(1);
		expect(noteListModalToggle.callCount).to.be.equal(1);
	});
	
	it('should append message to note if primary button on Modal clicked', function() {
		const appendMessageToNote = sinon.spy(this.mainWindow.find(MainWindow).instance(), 'appendMessageToNote');
		const appendNote = sinon.spy(this.mainWindow.find(MainWindow).find(MainInput).instance(), 'appendNote');
		const getSelectedNotes = sinon.stub(this.mainWindow.find(MainWindow).instance().noteSelector, 'getSelectedNotes');
		getSelectedNotes.returns([notes[this.noteIds[0]]]);
		const selectedContact = this.contactHaveMessage[0];
		const selectedContactMessages = messages[selectedContact.id].messages;
		store.dispatch(openMessage(selectedContact, selectedContact.id, 'message'));
		const activeMessages = this.mainWindow.find(MainWindow).instance().getOpenedMessage();
		activeMessages[activeMessages.length - 1].options[0].callback();
		this.mainWindow.find(Modal).at(1).find(Button).at(0).simulate('click');
		expect(appendMessageToNote.callCount).to.be.equal(1);
		expect(appendNote.callCount).to.be.equal(1);
	});

	it('should toggle modal if secondary button clicked', function() {
		const toggle = sinon.spy(this.mainWindow.find(MainWindow).instance().noteListModal, 'toggle');
		const getSelectedNotes = sinon.stub(this.mainWindow.find(MainWindow).instance().noteSelector, 'getSelectedNotes');
		getSelectedNotes.returns([notes[this.noteIds[0]]]);
		const selectedContact = this.contactHaveMessage[0];
		const selectedContactMessages = messages[selectedContact.id].messages;
		store.dispatch(openMessage(selectedContact, selectedContact.id, 'message'));
		const activeMessages = this.mainWindow.find(MainWindow).instance().getOpenedMessage();
		activeMessages[activeMessages.length - 1].options[0].callback();
		toggle.reset();
		this.mainWindow.find(Modal).at(1).find(Button).at(1).simulate('click');
		expect(toggle.callCount).to.be.equal(1);
	});

	it('should have remove note feature in note option', function() {
		const toggle = sinon.spy(this.mainWindow.find(MainWindow).instance().confirmationModal, 'toggle');
		const { title, meta, date, latestMonth } = notes[this.noteIds[0]];
		store.dispatch(openMessage({
			title,
			meta,
			date,
			latestMonth
		}, this.noteIds[0], 'note'));
		const activeMessages = this.mainWindow.find(MainWindow).instance().getOpenedMessage();
		const expectedAction = removeNote(this.noteIds[0], activeMessages.length - 1);
		toggle.reset();
		activeMessages[activeMessages.length - 1].options[0].callback();
		expect(toggle.callCount).to.be.equal(1)
	});

	it('should dispatch removeNote and toggle modal to close if ConfirmationModal primary button clicked', function() {
		const toggle = sinon.spy(this.mainWindow.find(MainWindow).instance().confirmationModal, 'toggle');
		const { title, meta, date, latestMonth } = notes[this.noteIds[0]];
		store.dispatch(openMessage({
			title,
			meta,
			date,
			latestMonth
		}, this.noteIds[0], 'note'));
		const activeMessages = this.mainWindow.find(MainWindow).instance().getOpenedMessage();
		const expectedAction = removeNote(this.noteIds[0], activeMessages.length - 1);
		activeMessages[activeMessages.length - 1].options[0].callback();
		toggle.reset();
		dispatch.reset();
		this.mainWindow.find(Modal).at(0).find(Button).at(0).simulate('click');
		const dispatchArg = dispatch.getCall(0).args[0];
		expect(dispatchArg).to.be.deep.equal(expectedAction);
		expect(toggle.callCount).to.be.equal(1)
	});
	
	it('should toggle modal to close if ConfirmationModal secondary button clicked', function() {
		const toggle = sinon.spy(this.mainWindow.find(MainWindow).instance().confirmationModal, 'toggle');
		const { title, meta, date, latestMonth } = notes[this.noteIds[0]];
		store.dispatch(openMessage({
			title,
			meta,
			date,
			latestMonth
		}, this.noteIds[0], 'note'));
		const activeMessages = this.mainWindow.find(MainWindow).instance().getOpenedMessage();
		activeMessages[activeMessages.length - 1].options[0].callback();
		toggle.reset();
		this.mainWindow.find(Modal).at(0).find(Button).at(1).simulate('click');
		expect(toggle.callCount).to.be.equal(1)
	});
});

