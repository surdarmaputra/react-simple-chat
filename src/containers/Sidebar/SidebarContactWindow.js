import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactWindow from '../../components/ContactWindow';
import { setWindowInformation} from '../../actions/WindowActions';
import { openMessage } from '../../actions/OpenedMessageActions';
import { getListFromObject, getListFromArray } from '../../helpers';

export class SidebarContactWindow extends React.Component {
	constructor(props) {
		super(props)
		this.openMessage = this.openMessage.bind(this);
		this.openNote = this.openNote.bind(this);
	}

	openMessage(contactId) {
		const selectedContact = this.props.contacts.reduce((contact, current) => current.id === contactId ? current : contact, null);
		const selectedMessage = this.props.messages[`${contactId}`];
		if (selectedContact !== null) {
			this.props.dispatch(openMessage(selectedContact, contactId));
			this.props.dispatch(setWindowInformation(selectedContact.title, `Last conversation: ${selectedMessage && selectedMessage.date ? selectedMessage.date : 'never'}`));
		}
	}

	openNote(noteId) {
		let title, meta, date, latestMonth;
		const selectedNote = this.props.notes[`${noteId}`];
		if (typeof selectedNote !== 'undefined') {
			({ title, meta, date, latestMonth } = selectedNote);
			this.props.dispatch(openMessage({ id: noteId, title, meta, date, latestMonth }, noteId, 'note'));
			this.props.dispatch(setWindowInformation(title, `Last updated: ${date ? date: 'never'}`));
		}
	}

	render() {
		return (
			<div className='sidebar__contact-window'>
				<Route exact path='/' render={() => <ContactWindow 
					contacts={getListFromObject(this.props.messages, this.props.search, ['title', 'meta', 'date'])} 
					activeContactId={this.props.openedMessage.contact.id} 
					onContactClick={(contactId) => this.openMessage(contactId)} />
				} />
				<Route path='/contacts' render={() => <ContactWindow 
					contacts={getListFromArray(this.props.contacts, this.props.search, ['title', 'meta'])}
					activeContactId={this.props.openedMessage.contact.id} 
					onContactClick={(contactId) => this.openMessage(contactId)} />
				} />
				<Route path='/notes' render={() => <ContactWindow 
					contacts={getListFromObject(this.props.notes, this.props.search, ['title', 'meta', 'date'])}
					activeContactId={this.props.openedMessage.messageId} 
					onContactClick={(noteId) => this.openNote(noteId)} />
				} />
			</div>
		);
	}
}

export default withRouter(connect(state => ({
	contacts: state.contacts,
	messages: state.messages,
	openedMessage: state.openedMessage,
	notes: state.notes,
	search: state.search
}))(SidebarContactWindow));
