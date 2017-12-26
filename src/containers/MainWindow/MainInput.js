import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import InputWindow from '../../components/InputWindow';

import { appendMessage, updateMessageInformation } from '../../actions/MessagesActions';
import { appendNote, updateNoteInformation } from '../../actions/NotesActions';
import { setWindowInformation } from '../../actions/WindowActions';

import { months } from '../../helpers';

export class MainInput extends React.Component {
	constructor(props) {
		super(props);	
		this.processInput = this.processInput.bind(this);
		this.appendMessage = this.appendMessage.bind(this);
		this.appendInitialMessage = this.appendInitialMessage.bind(this);
		this.appendNote = this.appendNote.bind(this);
		this.appendInitialNote = this.appendInitialNote.bind(this);
	}
	
	componentDidUpdate() {
		this.input.focusInput();
	}

	processInput(input) {
		if (input.length > 0 && this.props.openedMessage.contact.id !== null) {
			const now = new Date();
			const date = `${months[now.getMonth()]} ${now.getDate()}`;
			const time = `${('0' + now.getHours()).substr(-2)}:${('0' + now.getMinutes()).substr(-2)}`;
			if (this.props.openedMessage.messageType === 'message') {
				this.appendMessage(input, date, time);
				this.props.dispatch(setWindowInformation(this.props.window.title, `Last conversation: ${date}`));
			} else if (this.props.openedMessage.messageType === 'note') {
				this.appendNote(this.props.openedMessage.messageId, input, date, time, this.props.openedMessage.contact.latestMonth);
				this.props.dispatch(setWindowInformation(this.props.window.title, `Last conversation: ${date}`));
			}	
		}
	}

	appendMessage(input, date, time) {
		if (this.props.activeMessages.length === 0) this.appendInitialMessage(date, time);
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
		if (!messageLatestMonth || date.split(' ')[0].toLowerCase() !== messageLatestMonth.toLowerCase()) this.appendInitialNote(messageId, date);
		this.props.dispatch(appendNote(messageId, {
			type: 'message',
			content: input,
			date: `${date}, ${time}`
		}));	
		this.props.dispatch(updateNoteInformation(messageId, {
			meta: `${input.substr(0,10)}${input.length > 10 ? '...' : ''}`,
			date: date,
			latestMonth: date.split(' ')[0].toLowerCase()
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

	render() {
		return (
			<div className='main-window__input-window'>
				<InputWindow ref={input => this.input = input} placeholder='Say something...' onSubmit={(input) => this.processInput(input)} />
			</div>
		);
	}
}

export default withRouter(connect(state => ({ 
	window: state.window,
	openedMessage: state.openedMessage
}))(MainInput));
