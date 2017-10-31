import React from 'react';

const Button = (props) => (
	<div className={`button ${props.type ? 'button--' + props.type : ''}`} {...props}>
		<div className='button__content'>
			<div className='button__icon'>{ props.icon }</div>
			<div className='button__text'>{ props.text }</div>
		</div>
	</div>
);

export default Button;
