import React from 'react';

const Contact = (props) => (
	<div className='contact'>
		{ props.image && <img className='contact__image' src={props.image}/> }
		<div className='contact__content'>
			{ props.title && <div className='contact__title'>{ props.title }</div> }
			{ props.meta && <div className='contact__meta'>{ props.meta }</div> }
		</div>
		{ props.date && <div className='contact__date'>{ props.date }</div> }
	</div>
);

export default Contact;
