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
		this.getMessages = this.getMessageRecipients.bind(this);
		this.openMessage = this.openMessage.bind(this);
	}

	getMessageRecipients() {
		const messageKeys = Object.keys(this.props.messages);
		return messageKeys.map(key => { 
			let title, meta, date, image;
			({ title, meta, date, image } = this.props.messages[`${key}`]);
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
						contacts={this.getMessageRecipients()} 
						activeContactId={this.props.openedMessage.contact.id} 
						onContactClick={(contactId) => this.openMessage(contactId)} />
					} />
					<Route exact path='/contacts' render={() => <ContactWindow 
						contacts={this.props.contacts}									onContactClick={(contactId) => this.openMessage(contactId)} />
					} />

				</div>
			</div>
		);
	}
}

export default withRouter(connect(state => ({
	contacts: state.contacts,
	messages: state.messages,
	openedMessage: state.openedMessage
}))(Sidebar));
