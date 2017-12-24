import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import WindowTopBar from '../../components/WindowTopBar';
import MessageWindow from '../../components/MessageWindow';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import NoteSelector from '../../components/NoteSelector';
import ConfirmationModal from '../../components/ConfirmationModal';
import MainInput from './MainInput.js';
import { appendNote, removeNote } from '../../actions/NotesActions';

import { months } from '../../helpers';

class MainWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		}
		this.getOpenedMessage = this.getOpenedMessage.bind(this);
		this.getNotes = this.getNotes.bind(this);
		this.openNoteListModal = this.openNoteListModal.bind(this);
		this.appendMessageToNote = this.appendMessageToNote.bind(this);
		this.scrollToLastMessage = this.scrollToLastMessage.bind(this);
	}

	componentDidUpdate() {
		this.scrollToLastMessage();
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
				<MainInput activeMessages={ this.getOpenedMessage() }/>
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
