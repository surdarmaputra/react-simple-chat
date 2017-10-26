import React from 'react';

import Contact from '../Contact';

const ContactWindow = (props) => (
	<div className='contact-window'>
		{
			props.contacts && props.contacts.map((contact, index) => <Contact key={`contact-${contact.id}`} onClick={() => props.onContactClick && props.onContactClick(contact.id)} image={contact.image} title={contact.title} meta={contact.meta} date={contact.date} active={props.activeContactId === contact.id ? true: false} />)
		}
	</div>
);

export default ContactWindow;
