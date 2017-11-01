import React from 'react';
import PropTypes from 'prop-types';

import Contact from '../Contact';

const ContactWindow = (props) => (
	<div className='contact-window'>
		{
			props.contacts && props.contacts.map((contact, index) => <Contact key={`contact-${contact.id}`} onClick={() => props.onContactClick && props.onContactClick(contact.id)} image={contact.image} title={contact.title} meta={contact.meta} date={contact.date} active={props.activeContactId === contact.id ? true: false} />)
		}
	</div>
);

ContactWindow.propTypes = {
	contacts: PropTypes.array,
	onContactClick: PropTypes.func,
	activeContactId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

export default ContactWindow;
