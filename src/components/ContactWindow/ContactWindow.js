import React from 'react';

import Contact from '../Contact';

const ContactWindow = (props) => (
	<div className='contact-window'>
		{
			props.contacts && props.contacts.map((contact, index) => <Contact key={`contact-${index}`} image={contact.image} title={contact.title} meta={contact.meta} date={contact.date} />)
		}
	</div>
);

export default ContactWindow;
