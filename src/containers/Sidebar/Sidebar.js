import React from 'react';
import { connect } from 'react-redux';

import TabMenu from '../../components/TabMenu';
import ContactWindow from '../../components/ContactWindow';
import SearchBox from '../../components/SearchBox';

import { setWindowInformation} from '../../actions/WindowActions';
import { openMessage } from '../../actions/OpenedMessageActions';

const menus = [
	{
		icon: 'lnr lnr-bubble',
		href: '#'
	},
	{
		icon: 'lnr lnr-users',
		href: '#'
	},	
	{
		icon: 'lnr lnr-file-empty',
		href: '#'
	},
];

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.getMessages = this.getMessageRecipients.bind(this);
		this.openMessage = this.openMessage.bind(this);
	}

	getMessageRecipients() {
	console.log(this.props.messages);
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
		this.props.dispatch(openMessage(selectedContact, contactId));
		if (selectedContact !== null) {
			this.props.dispatch(setWindowInformation(selectedContact.title, `Last converstaion: ${selectedContact.date ? selectedContact.date : 'never'}`));
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
					<ContactWindow contacts={this.getMessageRecipients()} activeContactId={this.props.openedMessage.contact.id} onContactClick={(contactId) => this.openMessage(contactId)} />
				</div>
			</div>
		);
	}
}

export default connect(state => ({
	contacts: state.contacts,
	messages: state.messages,
	openedMessage: state.openedMessage
}))(Sidebar);
