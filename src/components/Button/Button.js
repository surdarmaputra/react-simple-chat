import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => (
	<div className={`button ${props.type ? 'button--' + props.type : ''}`} {...props}>
		<div className='button__content'>
			<div className='button__icon'>{ props.icon }</div>
			<div className='button__text'>{ props.text }</div>
		</div>
	</div>
);

Button.propTypes = {
	type: PropTypes.string,
	icon: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	text: PropTypes.string
};

export default Button;
