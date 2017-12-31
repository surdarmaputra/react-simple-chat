import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { NavLink } from 'react-router-dom';

import ConnectedMainInput, { MainInput } from './MainInput.js';

import configureStore from '../../configureStore';
import { initiateContacts } from '../../actions/ContactsActions';
import { initiateMessages } from '../../actions/MessagesActions';
import { initiateNotes } from '../../actions/NotesActions';
import { appendMessage, updateMessageInformation } from '../../actions/MessagesActions';
import { appendNote, updateNoteInformation } from '../../actions/NotesActions';
import { setWindowInformation } from '../../actions/WindowActions';
import { openMessage } from '../../actions/OpenedMessageActions';

import contacts from '../../samples/contacts';
import messages from '../../samples/messages';
import notes from '../../samples/notes';
import { months } from '../../helpers';

const store = configureStore();
const dispatch = sinon.spy(store, 'dispatch');
store.dispatch(initiateContacts(contacts));
store.dispatch(initiateMessages(messages));
store.dispatch(initiateNotes(notes));

const App = (props) => (
	<Provider store={store}>
		<MemoryRouter>
			<div>
				<NavLink to="/contacts">Contacts</NavLink>
				<ConnectedMainInput activeMessages={ props.activeMessages } />
			</div>
		</MemoryRouter>
	</Provider>
);

describe('<MainInput />', function() {
	beforeEach(function() {
		const messageIds = Object.keys(messages);
		this.noteIds = Object.keys(notes);
		this.contactHaveMessage = contacts.filter((contact) => messageIds.includes(contact.id));
		this.contactWithoutMessage = contacts.filter((contact) => !messageIds.includes(contact.id));
		this.mainInput = mount(<App />);
	});

	it('should render main-window__input-window', function() {
		expect(this.mainInput.find('.main-window__input-window').length).to.be.equal(1);	
	});	

	describe('integration test', function() {
		it('should not execute any dispatch if no open message', function() {
			dispatch.reset();
			this.mainInput.find('.button').at(0).simulate('click');
			expect(dispatch.called).to.be.equal(false);
		});
		
		it('should not execute any dispatch if opened message type neither message nor note', function() {			
			this.mainInput.find('textarea').at(0).instance().value = 'test';
			store.dispatch(openMessage(this.contactHaveMessage[0], this.contactHaveMessage[0].id, 'something-else'));			
			dispatch.reset();
			this.mainInput.find('.button').at(0).simulate('click');
			expect(dispatch.called).to.be.equal(false);
		});

		it('should dispatch appendMessage, updateMessageInformation and setWindowInformation if message opened', function() {
			const sampleInput = 'test';
			let dispatchArg;
			store.dispatch(openMessage(this.contactHaveMessage[0], this.contactHaveMessage[0].id, 'message'));			
			this.mainInput.setProps({ activeMessages: messages[this.contactHaveMessage[0].id].messages });
			this.mainInput.find('textarea').at(0).instance().value = sampleInput;
			dispatch.reset();
			this.mainInput.find('.button').at(0).simulate('click');
			expect(dispatch.callCount).to.be.equal(3);
			dispatchArg = dispatch.getCall(0).args[0];			
			expect(dispatchArg.type).to.be.equal('APPEND_MESSAGE');
			expect(dispatchArg.contact).to.be.deep.equal(this.contactHaveMessage[0]);
			expect(dispatchArg.message.type).to.be.equal('message');
			expect(dispatchArg.message.content).to.be.equal(sampleInput);
			dispatchArg  = dispatch.getCall(1).args[0];
			expect(dispatchArg.type).to.be.equal('UPDATE_MESSAGE_INFORMATION');
			expect(dispatchArg.messageId).to.be.equal(this.contactHaveMessage[0].id);
			dispatchArg = dispatch.getCall(2).args[0];
			expect(dispatchArg.type).to.be.equal('SET_WINDOW_INFORMATION');
		});
		
		it('should change url to / if current url not /', function() {
			const sampleInput = 'test';
			let dispatchArg;		
			this.mainInput.find('a[href="/contacts"]').simulate('click', { button: 0 });			
			expect(this.mainInput.find(MainInput).get(0).props.location.pathname).to.be.equal('/contacts');

			store.dispatch(openMessage(this.contactHaveMessage[0], this.contactHaveMessage[0].id, 'message'));			
			this.mainInput.setProps({ activeMessages: messages[this.contactHaveMessage[0].id].messages });
			this.mainInput.find('textarea').at(0).instance().value = sampleInput;
			dispatch.reset();
			this.mainInput.find('.button').at(0).simulate('click');
			expect(dispatch.callCount).to.be.equal(3);
			dispatchArg = dispatch.getCall(0).args[0];			
			expect(dispatchArg.type).to.be.equal('APPEND_MESSAGE');
			expect(dispatchArg.contact).to.be.deep.equal(this.contactHaveMessage[0]);
			expect(dispatchArg.message.type).to.be.equal('message');
			expect(dispatchArg.message.content).to.be.equal(sampleInput);
			dispatchArg  = dispatch.getCall(1).args[0];
			expect(dispatchArg.type).to.be.equal('UPDATE_MESSAGE_INFORMATION');
			expect(dispatchArg.messageId).to.be.equal(this.contactHaveMessage[0].id);
			dispatchArg = dispatch.getCall(2).args[0];
			expect(dispatchArg.type).to.be.equal('SET_WINDOW_INFORMATION');
			expect(this.mainInput.find(MainInput).get(0).props.location.pathname).to.be.equal('/');
		});

		it('should append ... to message information if input length > 10', function() {
			const sampleInput = 'something more than 10 characters';
			let dispatchArg;
			store.dispatch(openMessage(this.contactHaveMessage[0], this.contactHaveMessage[0].id, 'message'));			
			this.mainInput.setProps({ activeMessages: messages[this.contactHaveMessage[0].id].messages });
			this.mainInput.find('textarea').at(0).instance().value = sampleInput;
			dispatch.reset();
			this.mainInput.find('.button').at(0).simulate('click');
			expect(dispatch.callCount).to.be.equal(3);
			dispatchArg = dispatch.getCall(0).args[0];			
			expect(dispatchArg.type).to.be.equal('APPEND_MESSAGE');
			expect(dispatchArg.contact).to.be.deep.equal(this.contactHaveMessage[0]);
			expect(dispatchArg.message.type).to.be.equal('message');
			expect(dispatchArg.message.content).to.be.equal(sampleInput);
			dispatchArg  = dispatch.getCall(1).args[0];
			expect(dispatchArg.type).to.be.equal('UPDATE_MESSAGE_INFORMATION');
			expect(dispatchArg.messageId).to.be.equal(this.contactHaveMessage[0].id);
			expect(dispatchArg.information.meta).to.be.equal(`Me: ${sampleInput.substr(0,10)}...`);
			dispatchArg = dispatch.getCall(2).args[0];
			expect(dispatchArg.type).to.be.equal('SET_WINDOW_INFORMATION');
		});

		it('should append badge for first time conversation', function() {
			const sampleInput = 'test';
			let dispatchArg;
			store.dispatch(openMessage(this.contactWithoutMessage[0], this.contactWithoutMessage[0].id, 'message'));			
			this.mainInput.setProps({ activeMessages: [] });
			this.mainInput.find('textarea').at(0).instance().value = sampleInput;
			dispatch.reset();
			this.mainInput.find('.button').at(0).simulate('click');
			expect(dispatch.callCount).to.be.equal(5);
			dispatchArg = dispatch.getCall(0).args[0];
			expect(dispatchArg.type).to.be.equal('APPEND_MESSAGE');
			expect(dispatchArg.contact).to.be.deep.equal(this.contactWithoutMessage[0]);
			expect(dispatchArg.message.type).to.be.equal('badge');
			dispatchArg = dispatch.getCall(1).args[0];
			expect(dispatchArg.type).to.be.equal('APPEND_MESSAGE');
			expect(dispatchArg.message.type).to.be.equal('badge');
			dispatchArg = dispatch.getCall(2).args[0];			
			expect(dispatchArg.type).to.be.equal('APPEND_MESSAGE');
			expect(dispatchArg.contact).to.be.deep.equal(this.contactWithoutMessage[0]);
			expect(dispatchArg.message.type).to.be.equal('message');
			expect(dispatchArg.message.content).to.be.equal(sampleInput);
			dispatchArg  = dispatch.getCall(3).args[0];
			expect(dispatchArg.type).to.be.equal('UPDATE_MESSAGE_INFORMATION');
			expect(dispatchArg.messageId).to.be.equal(this.contactWithoutMessage[0].id);
			dispatchArg = dispatch.getCall(4).args[0];
			expect(dispatchArg.type).to.be.equal('SET_WINDOW_INFORMATION');
		});

		it('should dispatch appendNote, updateNoteInformation and setWindowInformation if note opened', function() {
			const now = new Date();
			const note = notes[this.noteIds[0]];
			const sampleInput = 'test';
			const thisMonthNotes = Object.assign({}, notes);
			thisMonthNotes[this.noteIds[0]].latestMonth = `${months[now.getMonth()]} ${now.getFullYear()}`;
			let dispatchArg;
			store.dispatch(initiateNotes(thisMonthNotes));
			store.dispatch(openMessage({ id: this.noteIds[0], title: note.title, meta: note.meta, date: note.date, latestMonth: note.latestMonth }, this.noteIds[0], 'note'));
			this.mainInput.setProps({ activeMessages: notes[this.noteIds[0]].messages });
			this.mainInput.find('textarea').at(0).instance().value = sampleInput;
			dispatch.reset();
			this.mainInput.find('.button').at(0).simulate('click');
			expect(dispatch.callCount).to.be.equal(3);
			dispatchArg = dispatch.getCall(0).args[0];			
			expect(dispatchArg.type).to.be.equal('APPEND_NOTE');
			expect(dispatchArg.noteId).equal(this.noteIds[0]);
			dispatchArg  = dispatch.getCall(1).args[0];
			expect(dispatchArg.type).to.be.equal('UPDATE_NOTE_INFORMATION');
			expect(dispatchArg.noteId).to.be.equal(this.noteIds[0]);
			dispatchArg = dispatch.getCall(2).args[0];
			expect(dispatchArg.type).to.be.equal('SET_WINDOW_INFORMATION');
		});

		it('should append ... to note information if input length > 10', function() {
			const now = new Date();
			const note = notes[this.noteIds[0]];
			const sampleInput = 'something more than 10 characters';
			const thisMonthNotes = Object.assign({}, notes);
			thisMonthNotes[this.noteIds[0]].latestMonth = `${months[now.getMonth()]} ${now.getFullYear()}`;
			let dispatchArg;
			store.dispatch(initiateNotes(thisMonthNotes));
			store.dispatch(openMessage({ id: this.noteIds[0], title: note.title, meta: note.meta, date: note.date, latestMonth: note.latestMonth }, this.noteIds[0], 'note'));
			this.mainInput.setProps({ activeMessages: notes[this.noteIds[0]].messages });
			this.mainInput.find('textarea').at(0).instance().value = sampleInput;
			dispatch.reset();
			this.mainInput.find('.button').at(0).simulate('click');
			expect(dispatch.callCount).to.be.equal(3);
			dispatchArg = dispatch.getCall(0).args[0];			
			expect(dispatchArg.type).to.be.equal('APPEND_NOTE');
			expect(dispatchArg.noteId).equal(this.noteIds[0]);
			dispatchArg  = dispatch.getCall(1).args[0];
			expect(dispatchArg.type).to.be.equal('UPDATE_NOTE_INFORMATION');
			expect(dispatchArg.noteId).to.be.equal(this.noteIds[0]);
			expect(dispatchArg.information.meta).to.be.equal(`${sampleInput.substr(0,10)}...`);
			dispatchArg = dispatch.getCall(2).args[0];
			expect(dispatchArg.type).to.be.equal('SET_WINDOW_INFORMATION');
		});

		it('should append badge for note in different month', function() {
			const now = new Date();
			const note = notes[this.noteIds[0]];
			const sampleInput = 'test';
			const thisMonthNotes = Object.assign({}, notes);
			thisMonthNotes[this.noteIds[0]].latestMonth = null;
			let dispatchArg;
			store.dispatch(initiateNotes(thisMonthNotes));
			store.dispatch(openMessage({ id: this.noteIds[0], title: note.title, meta: note.meta, date: note.date, latestMonth: note.latestMonth }, this.noteIds[0], 'note'));
			this.mainInput.setProps({ activeMessages: notes[this.noteIds[0]].messages });
			this.mainInput.find('textarea').at(0).instance().value = sampleInput;
			dispatch.reset();
			this.mainInput.find('.button').at(0).simulate('click');
			expect(dispatch.callCount).to.be.equal(4);
			dispatchArg = dispatch.getCall(0).args[0];			
			expect(dispatchArg.type).to.be.equal('APPEND_NOTE');
			expect(dispatchArg.note.type).to.be.equal('badge');
			dispatchArg = dispatch.getCall(1).args[0];			
			expect(dispatchArg.type).to.be.equal('APPEND_NOTE');

			expect(dispatchArg.noteId).equal(this.noteIds[0]);
			dispatchArg  = dispatch.getCall(2).args[0];
			expect(dispatchArg.type).to.be.equal('UPDATE_NOTE_INFORMATION');
			expect(dispatchArg.noteId).to.be.equal(this.noteIds[0]);
			dispatchArg = dispatch.getCall(3).args[0];
			expect(dispatchArg.type).to.be.equal('SET_WINDOW_INFORMATION');
		});
	});
});
