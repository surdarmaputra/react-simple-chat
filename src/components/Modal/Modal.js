import React from 'react';
import PropTypes from 'prop-types'

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<div className={`modal ${this.state.isOpen ? '' : 'modal--hidden'}`}>
				<div className='modal__box'>
					{ this.props.title && <div className='modal__title'>{ this.props.title }</div> }
					{ this.props.children }
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	title: PropTypes.string
};

export default Modal;
