import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import WindowTopBar from '../../components/WindowTopBar';
import MessageWindow from '../../components/MessageWindow';
import InputWindow from '../../components/InputWindow';
import Badge from '../../components/Badge';

import { appendMessage, updateMessageInformation } from '../../actions/MessagesActions';
import { setWindowInformation } from '../../actions/WindowActions';

class MainWindow extends React.Component {
	constructor(props) {
		super(props);
		this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		this.state = {
			messages: []
		}
		this.getOpenedMessage = this.getOpenedMessage.bind(this);
		this.appendMessage = this.appendMessage.bind(this);
		this.scrollToLastMessage = this.scrollToLastMessage.bind(this);
	}

	componentDidUpdate() {
		this.scrollToLastMessage();
		this.input.focusInput();
	}

	getOpenedMessage() {
		if (this.props.messages.hasOwnProperty(`${this.props.openedMessage.messageId}`)) {
			return this.props.messages[`${this.props.openedMessage.messageId}`].messages;
		} else return [];
	}

	appendMessage(input) {
		if (input.length > 0 && this.props.openedMessage.contact.id !== null) {
			const now = new Date();
			const date = `${this.months[now.getMonth()]} ${now.getDate()}`;
			const time = `${('0' + now.getHours()).substr(-2)}:${('0' + now.getMinutes()).substr(-2)}`;
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
			this.props.dispatch(setWindowInformation(this.props.window.title, `Last conversation: ${date}`));
			if (this.props.location.pathname === '/contacts') this.props.history.push('/');
		}
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
					<InputWindow ref={input => this.input = input} placeholder='Say something...' onSubmit={(input) => this.appendMessage(input)} />
				</div>
			</div>
		);
	}
}

export default withRouter(connect(state => ({ 
	window: state.window,
	messages: state.messages, 
	openedMessage: state.openedMessage
}))(MainWindow));
