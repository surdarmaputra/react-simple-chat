import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import WindowTopBar from '../../components/WindowTopBar';
import MessageWindow from '../../components/MessageWindow';
import InputWindow from '../../components/InputWindow';
import Badge from '../../components/Badge';

import { appendMessage, updateMessageInformation } from '../../actions/MessagesActions';
import { appendNote, updateNoteInformation } from '../../actions/NotesActions';

import { setWindowInformation } from '../../actions/WindowActions';

import { months } from '../../helpers';

class MainWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: []
		}
		this.getOpenedMessage = this.getOpenedMessage.bind(this);
		this.processInput = this.processInput.bind(this);
		this.appendMessage = this.appendMessage.bind(this);
		this.appendInitialMessage = this.appendInitialMessage.bind(this);
		this.appendNote = this.appendNote.bind(this);
		this.appendInitialNote = this.appendInitialNote.bind(this);
		this.scrollToLastMessage = this.scrollToLastMessage.bind(this);
	}

	componentDidUpdate() {
		this.scrollToLastMessage();
		this.input.focusInput();
	}

	getOpenedMessage() {
		let listObject;
		switch (this.props.openedMessage.messageType) {
			case 'message':
				listObject = Object.assign({}, this.props.messages);
				break;
			case 'note':
				listObject = Object.assign({}, this.props.notes);
				break;
			default:
				listObject = Object.assign({}, this.props.messages);					
		}

		if (listObject.hasOwnProperty(`${this.props.openedMessage.messageId}`)) {
			return listObject[`${this.props.openedMessage.messageId}`][`${this.props.openedMessage.messageType}s`];
		} else return [];
	}

	processInput(input) {
		if (input.length > 0 && this.props.openedMessage.contact.id !== null) {
			const now = new Date();
			const date = `${months[now.getMonth()]} ${now.getDate()}`;
			const time = `${('0' + now.getHours()).substr(-2)}:${('0' + now.getMinutes()).substr(-2)}`;
			if (this.props.openedMessage.messageType === 'message') {
				this.appendMessage(input, date, time);
			} else if (this.props.openedMessage.messageType === 'note') {
				this.appendNote(input, date, time);
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

	appendNote(input, date, time) {
		let messageLatestMonth = this.props.openedMessage.contact.latestMonth;
		if (date.split(' ')[0].toLowerCase() !== messageLatestMonth.toLowerCase()) this.appendInitialNote(date);
		this.props.dispatch(appendNote(this.props.openedMessage.messageId, {
			type: 'message',
			content: input,
			date: `${date}, ${time}`
		}));	
		this.props.dispatch(updateNoteInformation(this.props.openedMessage.messageId, {
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

	appendInitialNote(date) {
		this.props.dispatch(appendNote(this.props.openedMessage.messageId, {
			type: 'badge',
			content: date
		}));
	}

	scrollToLastMessage() {
		this.messageWindow.scrollTop = this.messageWindow.scrollHeight;
	}

	render() {
		return(
			<div className='main-window'>
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
