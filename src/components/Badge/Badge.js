import React from 'react';
import PropTypes from 'prop-types';

const Badge = (props) => (
	<div className='badge'>
		{ props.content }
	</div>
);

Badge.propTypes = {
	content: PropTypes.string
};

export default Badge;
