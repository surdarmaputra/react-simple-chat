import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TabMenu from '../../components/TabMenu';
import ContactWindow from '../../components/ContactWindow';
import SearchBox from '../../components/SearchBox';

import { setWindowInformation} from '../../actions/WindowActions';
import { openMessage } from '../../actions/OpenedMessageActions';
import { setSearchKeyword, clearSearchKeyword } from '../../actions/SearchActions';

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
		this.getContacts = this.getContacts.bind(this);
		this.openMessage = this.openMessage.bind(this);
		this.openNote = this.openNote.bind(this);
		this.search = this.search.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.location.pathname !== nextProps.location.pathname && nextProps.search.length > 0) {
			this.searchBox.clearInput();
			this.props.dispatch(clearSearchKeyword());		
		}
	}

	getListFromObject(listObject, search = '') {
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
		}).filter(item => {
			if (search.length > 0) {
				search = search.toLowerCase();
				return item.title.toLowerCase().includes(search) || item.meta.toLowerCase().includes(search) || item.date.toLowerCase().includes(search)
			} else return true;
		});
	}

	getContacts(search = '') {
		return this.props.contacts.filter(item => {
			if (search.length > 0) {
				search = search.toLowerCase();
				return item.title.toLowerCase().includes(search);
			} else return true;
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

	search(keyword) {
		this.props.dispatch(setSearchKeyword(keyword));
	}

	render() {
		return (
			<div className='sidebar'>
				<div className='sidebar__tab-menu'>
					<TabMenu menus={menus} />
				</div>
				<div className='sidebar__search-box'>
					<SearchBox ref={searchBox => this.searchBox = searchBox} icon='lnr lnr-magnifier' placeholder='Search for ...' onInputChange={(keyword) => this.search(keyword)} />
				</div>
				<div className='sidebar__contact-window'>
					<Route exact path='/' render={() => <ContactWindow 
						contacts={this.getListFromObject(this.props.messages, this.props.search)} 
						activeContactId={this.props.openedMessage.contact.id} 
						onContactClick={(contactId) => this.openMessage(contactId)} />
					} />
					<Route path='/contacts' render={() => <ContactWindow 
						contacts={this.getContacts(this.props.search)}
						activeContactId={this.props.openedMessage.contact.id} 
						onContactClick={(contactId) => this.openMessage(contactId)} />
					} />
					<Route path='/notes' render={() => <ContactWindow 
						contacts={this.getListFromObject(this.props.notes, this.props.search)}
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
	notes: state.notes,
	search: state.search
}))(Sidebar));
