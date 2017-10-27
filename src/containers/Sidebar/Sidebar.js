import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TabMenu from '../../components/TabMenu';
import ContactWindow from '../../components/ContactWindow';
import SearchBox from '../../components/SearchBox';

import { setWindowInformation} from '../../actions/WindowActions';
import { openMessage } from '../../actions/OpenedMessageActions';

const menus = [
	{
		icon: 'lnr lnr-bubble',
		href: '/',
		exact: true,
	},
	{
		icon: 'lnr lnr-users',
		href: '/contacts'
	},	
	{
		icon: 'lnr lnr-file-empty',
		href: '/notes'
	},
];

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.getListFromObject = this.getListFromObject.bind(this);
		this.openMessage = this.openMessage.bind(this);
		this.openNote = this.openNote.bind(this);
		}

	getListFromObject(listObject) {
		const keys = Object.keys(listObject);
		return keys.map(key => { 
			let title, meta, date, image;
			({ title, meta, date, image } = listObject[`${key}`]);
			return {
				id: key,
				title,
				meta,
				date,
				image
			};
		});
	}

	openMessage(contactId) {
		const selectedContact = this.props.contacts.reduce((contact, current) => current.id === contactId ? current : contact, null);
		const selectedMessage = this.props.messages[`${contactId}`];
		this.props.dispatch(openMessage(selectedContact, contactId));
		if (selectedContact !== null) {
			this.props.dispatch(setWindowInformation(selectedContact.title, `Last converstaion: ${selectedMessage && selectedMessage.date ? selectedMessage.date : 'never'}`));
		}
	}

	openNote(noteId) {
		let title, meta, date, latestMonth;
		const selectedNote = this.props.notes[`${noteId}`];
		({ title, meta, date, latestMonth } = selectedNote);
		if (selectedNote !== null) {
			this.props.dispatch(openMessage({ id: noteId, title, meta, date, latestMonth }, noteId, 'note'));
			this.props.dispatch(setWindowInformation(title, `Last updated: ${date ? date: 'never'}`));
		}
	}

	render() {
		return (
			<div className='sidebar'>
				<div className='sidebar__tab-menu'>
					<TabMenu menus={menus} />
				</div>
				<div className='sidebar__search-box'>
					<SearchBox icon='lnr lnr-magnifier' />
				</div>
				<div className='sidebar__contact-window'>
					<Route exact path='/' render={() => <ContactWindow 
						contacts={this.getListFromObject(this.props.messages)} 
						activeContactId={this.props.openedMessage.contact.id} 
						onContactClick={(contactId) => this.openMessage(contactId)} />
					} />
					<Route path='/contacts' render={() => <ContactWindow 
						contacts={this.props.contacts}
						activeContactId={this.props.openedMessage.contact.id} 
						onContactClick={(contactId) => this.openMessage(contactId)} />
					} />
					<Route path='/notes' render={() => <ContactWindow 
						contacts={this.getListFromObject(this.props.notes)}
						activeContactId={this.props.openedMessage.messageId} 
						onContactClick={(noteId) => this.openNote(noteId)} />
					} />
				</div>
			</div>
		);
	}
}

export default withRouter(connect(state => ({
	contacts: state.contacts,
	messages: state.messages,
	openedMessage: state.openedMessage,
	notes: state.notes
}))(Sidebar));
