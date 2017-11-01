import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import Button from '../Button';

class ConfirmationModal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			carriedObject: {}
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle(carriedObject) {
		if (carriedObject) this.setState({ carriedObject });
		this.modal.toggle();
	}

	render() {
		return (
			<Modal ref={modal => this.modal = modal} title={ this.props.title }>
				<div className='confirmation-modal'>
					<div className='confirmation-modal__text'>
						{ this.props.text }		
					</div>
					<div className='confirmation-modal__actions'>
						<div className='confirmation-modal__button'>
							<Button type='primary' icon={<i className='lnr lnr-checkmark-circle'></i>} text='Okay' onClick={() => typeof this.props.onOkayClick === 'function' && this.props.onOkayClick(this.state.carriedObject)} />
						</div>
						<div className='confirmation-modal__button'>
							<Button type='default' icon={<i className='lnr lnr-cross-circle'></i>} text='Cancel' onClick={() => typeof this.props.onCancelClick === 'function' && this.props.onCancelClick()} />
						</div>	
					</div>
				</div>
			</Modal>
		);
	}
}

ConfirmationModal.propTypes = {
	onOkayClick: PropTypes.func,
	onCancelClick: PropTypes.func,
	text: PropTypes.string,
	title: PropTypes.string
};

export default ConfirmationModal;
