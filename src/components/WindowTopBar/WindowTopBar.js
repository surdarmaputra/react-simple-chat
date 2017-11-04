import React from 'react';
import PropTypes from 'prop-types';

const WindowTopBar = (props) => (
	<div className='window-top-bar'>
		{ props.image && <img className='window-top-bar__image' src={props.image}/> }
		{ props.title && <div className='window-top-bar__title'>{ props.title }</div> }
		{ props.meta && <div className='window-top-bar__meta'>{ props.meta }</div> }
	</div>
);

WindowTopBar.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	meta: PropTypes.string
};

export default WindowTopBar;
