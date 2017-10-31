import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import WindowTopBar from '../../components/WindowTopBar';
import MessageWindow from '../../components/MessageWindow';
import InputWindow from '../../components/InputWindow';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import NoteSelector from '../../components/NoteSelector';
import ConfirmationModal from '../../components/ConfirmationModal';

import { appendMessage, updateMessageInformation } from '../../actions/MessagesActions';
import { appendNote, updateNoteInformation, removeNote } from '../../actions/NotesActions';

import { setWindowInformation } from '../../actions/WindowActions';

import { months } from '../../helpers';

class MainWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		}
		this.getOpenedMessage = this.getOpenedMessage.bind(this);
		this.getNotes = this.getNotes.bind(this);
		this.processInput = this.processInput.bind(this);
		this.appendMessage = this.appendMessage.bind(this);
		this.appendInitialMessage = this.appendInitialMessage.bind(this);
		this.appendNote = this.appendNote.bind(this);
		this.appendInitialNote = this.appendInitialNote.bind(this);
		this.openNoteListModal = this.openNoteListModal.bind(this);
		this.appendMessageToNote = this.appendMessageToNote.bind(this);
		this.scrollToLastMessage = this.scrollToLastMessage.bind(this);
	}

	componentDidUpdate() {
		this.scrollToLastMessage();
		this.input.focusInput();
	}

	getOpenedMessage() {
		let listObject, customProperties;
		switch (this.props.openedMessage.messageType) {
			case 'message':
				listObject = Object.assign({}, this.props.messages);
				customProperties = (item) => ({ 
					messageType: 'message',
					options: [
						{
							text: 'Add to Note',
							callback: () => this.openNoteListModal(item)
						}
					] 
				});
				break;
			case 'note':
				listObject = Object.assign({}, this.props.notes);
				customProperties = (item, index) => ({ 
					messageType: 'note',
					options: [
						{
							text: 'Remove',
							type: 'danger',
							callback: () => this.confirmationModal.toggle({ noteId: this.props.openedMessage.messageId, noteIndex: index })
						}
					] 
				});
				break;
			default:
				listObject = Object.assign({}, this.props.messages);			
				customProperties = (item) => ({});		
		}

		if (listObject.hasOwnProperty(`${this.props.openedMessage.messageId}`)) {
			let finalList = listObject[`${this.props.openedMessage.messageId}`][`${this.props.openedMessage.messageType}s`];
			return finalList.map((item, index) => Object.assign({}, item, customProperties(item, index)));
		} else return [];
	}

	getNotes() {
		const listObject = this.props.notes;
		const keys = Object.keys(listObject);
		return keys.map(key => { 
			let title, meta, date, image, latestMonth;
			({ title, meta, date, image, latestMonth } = listObject[`${key}`]);
			return {
				id: key,
				title,
				meta,
				date,
				image,
				latestMonth
			};
		});
	}

	processInput(input) {
		if (input.length > 0 && this.props.openedMessage.contact.id !== null) {
			const now = new Date();
			const date = `${months[now.getMonth()]} ${now.getDate()}`;
			const time = `${('0' + now.getHours()).substr(-2)}:${('0' + now.getMinutes()).substr(-2)}`;
			if (this.props.openedMessage.messageType === 'message') {
				this.appendMessage(input, date, time);
			} else if (this.props.openedMessage.messageType === 'note') {
				this.appendNote(this.props.openedMessage.messageId, input, date, time, this.props.openedMessage.contact.latestMonth);
			}
			this.props.dispatch(setWindowInformation(this.props.window.title, `Last conversation: ${date}`));
		}
	}

	appendMessage(input, date, time) {
		if (this.getOpenedMessage().length === 0) this.appendInitialMessage(date, time);
		this.props.dispatch(appendMessage(this.props.openedMessage.contact, {
			type: 'message',
			content: input,
			meta: 'Me',
			date: `${date}, ${time}`
		}));
		this.props.dispatch(updateMessageInformation(this.props.openedMessage.messageId, {
			meta: `Me: ${input.substr(0,10)}${input.length > 10 ? '...' : ''}`,
			date: date
		}));
		if (this.props.location.pathname === '/contacts') this.props.history.push('/');
	}

	appendNote(messageId, input, date, time, messageLatestMonth) {
		if (date.split(' ')[0].toLowerCase() !== messageLatestMonth.toLowerCase()) this.appendInitialNote(messageId, date);
		this.props.dispatch(appendNote(messageId, {
			type: 'message',
			content: input,
			date: `${date}, ${time}`
		}));	
		this.props.dispatch(updateNoteInformation(messageId, {
			meta: `${input.substr(0,10)}${input.length > 10 ? '...' : ''}`,
			date: date
		}));
	}

	appendInitialMessage(date, time) {
		this.props.dispatch(appendMessage(this.props.openedMessage.contact, {
			type: 'badge',
			content: `${date}, ${time}`
		}));
		this.props.dispatch(appendMessage(this.props.openedMessage.contact, {
			type: 'badge',
			content: 'You joined the conversation'
		}));
	}

	appendInitialNote(messageId, date) {
		this.props.dispatch(appendNote(messageId, {
			type: 'badge',
			content: date
		}));
	}

	openNoteListModal(message) {
		this.unprocessedMessage = message;
		this.noteListModal.toggle();
	}

	appendMessageToNote(notes, message) {
		const now = new Date();
		const date = `${months[now.getMonth()]} ${now.getDate()}`;
		const time = `${('0' + now.getHours()).substr(-2)}:${('0' + now.getMinutes()).substr(-2)}`;

		notes.map(note => {
			this.appendNote(note.id, message.content, date, time, note.latestMonth);
		})
	}

	scrollToLastMessage() {
		this.messageWindow.scrollTop = this.messageWindow.scrollHeight;
	}

	render() {
		return(
			<div className='main-window'>
				<ConfirmationModal 
					ref={confirmation => this.confirmationModal = confirmation} 
					text='Are you sure want to remove this note?' 
					onOkayClick={(carriedObject) => {
						let noteId, noteIndex;
						({ noteId, noteIndex } = carriedObject);
						this.props.dispatch(removeNote(noteId, noteIndex));
						this.confirmationModal.toggle();
					}}
					onCancelClick={() => this.confirmationModal.toggle()} />
				<Modal ref={modal => this.noteListModal = modal} title='Note List'>
					<NoteSelector ref={noteSelector => this.noteSelector = noteSelector} notes={this.getNotes()} />					
					<Button type='primary' icon={<i className='lnr lnr-plus-circle'></i>} text='Add to Note' onClick={() => this.appendMessageToNote(this.noteSelector.getSelectedNotes(), this.unprocessedMessage)} />
					<Button type='default' icon={<i className='lnr lnr-cross-circle'></i>} text='Close' onClick={() => this.noteListModal.toggle()} />
				</Modal>
				<div className='main-window__top-bar'>
					<WindowTopBar title={this.props.window.title} meta={this.props.window.meta} />
				</div>
				<div ref={element => this.messageWindow = element} className='main-window__message-window'>
					<MessageWindow messages={this.getOpenedMessage()} />
				</div>
				<div className='main-window__input-window'>
					<InputWindow ref={input => this.input = input} placeholder='Say something...' onSubmit={(input) => this.processInput(input)} />
				</div>
			</div>
		);
	}
}

export default withRouter(connect(state => ({ 
	window: state.window,
	messages: state.messages, 
	openedMessage: state.openedMessage,
	notes: state.notes
}))(MainWindow));
